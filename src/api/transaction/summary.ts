import { validateSchema } from "@/libs/validator";
import privateClient from "../privateClient";
import { getTransactionMonthlySummarySchema } from "@/schema";

export async function getTransactionMonthlySummary(
  accountId: string,
  year: number,
  month: number,
) {
  const response = await privateClient
    .get(`/transaction/${accountId}/${year}/${month}/`)
    .then((res) => {
      return validateSchema({
        schema: getTransactionMonthlySummarySchema,
        schemaName: res.request.url,
        dto: res.data,
      });
    });

  return response;
}
