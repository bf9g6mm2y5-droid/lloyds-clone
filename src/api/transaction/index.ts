import { TransactionType } from "@/constants/transactions";
import privateClient from "../privateClient";
import { validateSchema } from "@/libs/validator";
import { transactionSchema } from "@/schema";

// export async function getTransactions(
//   accountId: string,
//   cursor: string,
//   limit: number,
// ) {
//   const response = await privateClient
//     .get(`transaction/${accountId}`, {
//       params: {
//         cursor,
//         limit,
//       },
//     })
//     .then((res) => {
//       return validateSchema({
//         schema: getTransactionSchema,
//         schemaName: res.request.url,
//         dto: res.data,
//       });
//     });
// }

export async function createTransaction({
  accountId,
  accountName,
  amount,
  type = TransactionType.BankTransfer,
}: {
  type?: TransactionType;
  accountId?: string;
  accountName?: string;
  amount: number;
  ref?: string;
}) {
  return privateClient
    .post(`transactions`, {
      accountId,
      accountName,
      amount,
      type,
    })
    .then((res) =>
      validateSchema({
        schema: transactionSchema,
        schemaName: res.request.url,
        dto: res.data,
      }),
    );
}
