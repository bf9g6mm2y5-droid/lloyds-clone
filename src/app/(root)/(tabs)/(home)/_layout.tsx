import { Header } from "@/components/headers";
import { useUserQuery } from "@/hooks";
import { getGreetings } from "@/libs/utils";
import { Stack, useGlobalSearchParams } from "expo-router";
import { useMemo } from "react";

export default function HomeLayout() {
  const query = useUserQuery();
  const fullName = query.data?.fullName ?? "User";
  const greetings = useMemo(getGreetings, []);

  const glob = useGlobalSearchParams<{ id: string; name: string }>();

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          header: (props) => (
            <Header
              showMessage
              showSupport
              showUser
              title={`${greetings}, ${fullName}`}
              {...props}
            />
          ),
        }}
      />

      <Stack.Screen
        name="account/[id]"
        options={{
          title: glob?.name,
          header: (props) => <Header {...props} showBack />,
        }}
      />

      <Stack.Screen
        name="transaction/[id]"
        options={{
          title: "Transaction Details",
          header: (props) => <Header showBack {...props} />,
        }}
      />
    </Stack>
  );
}
