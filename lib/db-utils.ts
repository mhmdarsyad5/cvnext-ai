"use server";

import { getDbConnection } from "./db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { CVReview, DbUser } from "./types";
import { revalidatePath } from "next/cache";
import { initializeSchema } from "./db-schema";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function withRetry<T>(operation: () => Promise<T>): Promise<T> {
  let lastError;

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;

      if (error?.code === "42P01") {
        // Tables don't exist, try to initialize schema
        await initializeSchema();
        continue;
      }

      if (i < MAX_RETRIES - 1) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        continue;
      }
    }
  }

  throw lastError;
}

export async function ensureUserInDb() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  return await withRetry(async () => {
    const sql = await getDbConnection();

    // Check if user exists
    const existingUser = await sql`
      SELECT * FROM users WHERE id = ${userId}
    `;

    if (existingUser.length === 0) {
      const user = await currentUser();
      if (!user || !user.emailAddresses?.[0]?.emailAddress) {
        throw new Error("No email found");
      }

      // Insert new user
      await sql`
        INSERT INTO users (id, email)
        VALUES (${userId}, ${user.emailAddresses[0].emailAddress})
      `;
    }

    return userId;
  });
}

export async function saveReview(review: {
  fileName: string | null;
  ownerName: string | null;
  analysisText: string;
  score: number;
}) {
  const userId = await ensureUserInDb();

  return await withRetry(async () => {
    const sql = await getDbConnection();

    const result = await sql`
      INSERT INTO cv_reviews (user_id, file_name, owner_name, analysis_text, score)
      VALUES (${userId}, ${review.fileName}, ${review.ownerName}, ${review.analysisText}, ${review.score})
      RETURNING *
    `;

    revalidatePath("/dashboard");
    return result[0] as CVReview;
  });
}

export async function getUserReviews() {
  const userId = await ensureUserInDb();

  return await withRetry(async () => {
    const sql = await getDbConnection();

    const reviews = await sql`
      SELECT * FROM cv_reviews 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return reviews as CVReview[];
  });
}

export async function getReviewById(
  reviewId: number
): Promise<CVReview | null> {
  const userId = await ensureUserInDb();

  return await withRetry(async () => {
    const sql = await getDbConnection();

    const reviews = await sql`
      SELECT * FROM cv_reviews 
      WHERE id = ${reviewId} AND user_id = ${userId}
    `;

    if (reviews.length === 0) {
      return null;
    }

    return reviews[0] as CVReview;
  });
}

export async function deleteReview(reviewId: number) {
  const userId = await ensureUserInDb();

  return await withRetry(async () => {
    const sql = await getDbConnection();

    const result = await sql`
      DELETE FROM cv_reviews 
      WHERE id = ${reviewId} AND user_id = ${userId}
      RETURNING *
    `;

    revalidatePath("/dashboard");
    return result[0] as CVReview;
  });
}
