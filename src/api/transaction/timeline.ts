import { validateSchema } from "@/libs/validator";
import privateClient from "../privateClient";
import { getTransactionTimelineSchema } from "@/schema";

export async function GetTransactionTimeline(accountId: string) {
  const response = await privateClient
    .get(`transaction/timeline/${accountId}`)
    .then((res) => {
      return validateSchema({
        schema: getTransactionTimelineSchema,
        schemaName: res.request.url,
        dto: res.data,
      });
    });

  return response;
}
