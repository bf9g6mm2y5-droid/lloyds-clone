import privateClient from "@/api/privateClient";
import { validateSchema } from "@/libs/validator";
import { getAccountSchema, getAllAccountSchema } from "@/schema";

export async function GetAllAccount() {
  const response = await privateClient
    .get("/account")
    .then((res) =>
      validateSchema({
        schema: getAllAccountSchema,
        dto: res.data,
        schemaName: res.request.url,
      }),
    );

  // await new Promise((resolve) => setTimeout(resolve, 15000));
  return response;
}

export async function GetAccount(accountId: string) {
  const response = await privateClient
    .get(`/account/${accountId}`)
    .then((res) =>
      validateSchema({
        schema: getAccountSchema,
        schemaName: res.request.url,
        dto: res.data,
      }),
    );

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  return response;
}
