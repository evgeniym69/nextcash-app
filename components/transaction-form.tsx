"use client";

import { z } from "zod";

import { addDays } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const transactionFormSchema = z.object({
  transactionType: z.enum(["income", "expense"]),
  categoryId: z.coerce.number().positive("Please select a category"),
  transactionDate: z.coerce
    .date()
    .max(addDays(new Date(), 1), "Transaction date cannot be in the future"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  description: z
    .string()
    .min(3, "Description must contain at least 3 characters")
    .max(300, "Description must contain a maximum of 300 characters"),
});

const TransactionForm = () => {
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: 0,
      categoryId: 0,
      description: "",
      transactionDate: new Date(),
      transactionType: "income",
    },
  });

  const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    console.log("DATA___", data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="grid grid-cols-2 gap-y-5 gap-x-2 items-start"
        >
          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                      <SelectContent></SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </fieldset>
      </form>
    </Form>
  );
};

export default TransactionForm;
