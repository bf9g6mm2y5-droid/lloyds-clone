import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Button, DataTimePicker, TextInput } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FindUserForm, findUserFormSchema } from "@/schema";
import { MAXIMUM_DOB } from "@/constants";
import { cn } from "@/libs/utils";

export default function Page() {
  const [userIdKnown, setUserIdKnown] = useState(true);

  const {
    control,
    formState: { isValid },
  } = useForm<FindUserForm>({
    resolver: zodResolver(findUserFormSchema),
    mode: "all",
    shouldFocusError: true,
  });

  return (
    <ScrollView
      className="bg-white px-4 pb-20"
      contentContainerClassName="flex-grow"
    >
      <Text className="py-10 font-light">
        First let's find you. Then you'll be able to change your password
      </Text>

      <View className="gap-y-2 pb-3">
        <Text className="font-semibold">Do you know your User ID?</Text>
        <View className="flex-row self-start overflow-hidden rounded-lg border border-gray-300">
          <Pressable
            onPress={() => setUserIdKnown(true)}
            className={cn("px-5 py-2", userIdKnown && "bg-black")}
          >
            <Text className={cn(userIdKnown ? "text-white" : "text-black")}>
              Yes
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setUserIdKnown(false)}
            className={cn("px-5 py-2", !userIdKnown && "bg-black")}
          >
            <Text className={cn(!userIdKnown ? "text-white" : "text-black")}>
              No
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="flex-1 gap-y-4">
        <TextInput control={control} name="userId" label="Enter your User ID" />
        <TextInput control={control} name="firstName" label="First name" />
        <TextInput control={control} name="lastName" label="Last name" />

        <DataTimePicker
          control={control}
          name="dob"
          defaultValue={MAXIMUM_DOB}
          label="Date of birth"
        />

        <View className="flex-1" />

        <Button label="Continue" size="lg" />
      </View>
    </ScrollView>
  );
}
