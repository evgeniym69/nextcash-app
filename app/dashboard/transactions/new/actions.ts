"use server";

import { auth } from "@clerk/nextjs/server";
import z from "zod";

import { addDays, format, subYears } from "date-fns";
import { db } from "@/db";
import { transactionsTable } from "@/db/schema";

const transactionSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  description: z
    .string()
    .min(3, "Description must contain at least 3 characters")
    .max(300, "Description must contain a maximum of 300 characters"),
  categoryId: z.number().positive("Category ID is invalid"),
  transactionDate: z.coerce
    .date()
    .min(subYears(new Date(), 100), "Transaction date is too old")
    .max(addDays(new Date(), 1), "Transaction date cannot be in the future"),
});

export const createTransaction = async (data: {
  amount: number;
  transactionDate: string;
  description: string;
  categoryId: number;
}) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = transactionSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation?.error?.issues[0]?.message,
    };
  }

  const [transaction] = await db
    .insert(transactionsTable)
    .values({
      userId,
      amount: data.amount.toString(),
      description: data.description,
      categoryId: data.categoryId,
      transactionDate: data.transactionDate,
    })
    .returning();

  return {
    id: transaction.id,
    message: "Transaction created successfully",
  };
};
