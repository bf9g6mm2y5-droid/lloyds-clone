import { validateSchema } from "@/libs/validator";
import privateClient from "@/api/privateClient";
import { getCurrentUserSchema } from "@/schema";

export async function getCurrentUser() {
  const response = await privateClient
    .get("/users/me")
    .then((res) => {
      return validateSchema({
        schema: getCurrentUserSchema,
        schemaName: "api/users/me",
        dto: res.data,
      });
    });

  return response;
}
