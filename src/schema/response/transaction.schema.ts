import { TransactionType } from "@/constants/transactions";
import { sortCodeFormatter } from "@/libs/utils";
import { z } from "zod";

export const getTransactionTimelineSchema = z.array(z.string());

export type GetTransactionTimeline = z.infer<
  typeof getTransactionTimelineSchema
>;

export const getTransactionMonthlySummarySchema = z.object({
  summary: z.object({
    incoming: z.number().positive(),
    outgoing: z.number().nonpositive(),
  }),
});

export type GetTransactionMonthlySummary = z.infer<
  typeof getTransactionMonthlySummarySchema
>;

export const transactionSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  type: z.nativeEnum(TransactionType),
  amount: z.number(),
  payeeName: z.string(),
  sortCode: z.string().transform(sortCodeFormatter).optional(),
  accountNumber: z.string().optional(),
  businessType: z.string().optional(),
  retailerLocation: z.string().optional(),
  payeeDetails: z.string().optional(),
  reference: z.string().optional(),
  cardEnding: z.string().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;
