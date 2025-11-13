"use client";

import TransactionForm, {
  transactionFormSchema,
} from "@/components/transaction-form";
import { Category } from "@/types/Category";
import z from "zod";
import { createTransaction } from "./actions";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NewTransactionForm = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransaction({
      amount: data.amount,
      description: data.description,
      categoryId: data.categoryId,
      transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
    });

    if (result.error) {
      toast.error("Error create transaction", {
        description: result.message || "Try later",
      });
      return;
    }

    toast.success("Success", {
      description: "Transaction created successfully",
    });

    router.push(
      `/dashboard/transactions?month=${
        data.transactionDate.getMonth() + 1
      }&year=${data.transactionDate.getFullYear()}`
    );

    console.log("RESULT", result.id);
  };

  return <TransactionForm onSubmit={handleSubmit} categories={categories} />;
};

export default NewTransactionForm;
