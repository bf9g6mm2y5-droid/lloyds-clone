import { createPayee } from "@/api/users/payee";
import { Button } from "@/components/ui";
import { InlineLabelTextInput } from "@/components/ui";
import { PayeeQueryKey } from "@/libs/query-keys";
import { sortCodeFormatter } from "@/libs/utils";
import { CreatePayeeForm, createPayeeFormSchema } from "@/schema";
import { useLoadingScreen, usePaymentActions } from "@/store";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const { setLoading } = useLoadingScreen();
  const { setPayee } = usePaymentActions();

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: createPayee,
    onMutate: () => {
      console.log("Creating payee...");
      setLoading(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PayeeQueryKey.payees });
      setPayee({ ...data, newEntry: true });
      router.navigate("/payment-details");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreatePayeeForm>({
    resolver: zodResolver(createPayeeFormSchema),
    mode: "all",
    criteriaMode: "all",
    delayError: 100,
    defaultValues: {
      name: "John Doe",
      sortCode: "12-34-56",
      accountNumber: "12345678",
      business: false,
    },
  });

  const onSubmit = (data: CreatePayeeForm) => {
    mutate.mutate(data);
  };

  // useEffect(() => {
  //   if (mutate.isPending) {
  //     console.log("Creating payee...");
  //     setLoading(true);
  //   } else if (mutate.isSuccess || mutate.isError) {
  //     setLoading(false);
  //   }
  // }, [
  //   mutate.data,
  //   mutate.isError,
  //   mutate.isPending,
  //   mutate.isSuccess,
  //   router,
  //   setLoading,
  //   setPayee,
  // ]);

  return (
    <View
      className="flex-1 gap-y-5 bg-white px-4 py-10"
      style={{ paddingBottom: bottom }}
    >
      <InlineLabelTextInput
        label="Payee name:"
        info="Please use their full name"
        control={control}
        name="name"
        placeholderTextColor="#838383"
        placeholder="Name of the person or company"
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <InlineLabelTextInput
        label="Sort code:"
        control={control}
        textModifiers={sortCodeFormatter}
        name="sortCode"
        placeholderTextColor="#838383"
        placeholder="Enter sort code"
        keyboardType="numeric"
        maxLength={8}
        inputMode="numeric"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <InlineLabelTextInput
        label="Account number:"
        control={control}
        name="accountNumber"
        placeholderTextColor="#838383"
        placeholder="Enter account number"
        keyboardType="numeric"
        maxLength={8}
        inputMode="numeric"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <Controller
        control={control}
        name="business"
        render={({ field: { value, onChange } }) => (
          <Pressable
            onPress={() => onChange(!value)}
            className="flex-row items-center gap-x-3"
          >
            <Checkbox
              style={{ borderRadius: 5, width: 25, height: 25 }}
              color={"#000"}
              value={value}
              onValueChange={onChange}
            />
            <Text>Is this a business?</Text>
          </Pressable>
        )}
      />

      <View className="flex-row items-center gap-x-3 rounded-xl bg-[#F2F2F2] px-3 py-4">
        <Ionicons name="shield-outline" size={24} color="black" />
        <Text className="text-sm">
          We'll check these details with the payee's bank.
        </Text>
      </View>

      <View className="flex-1" />

      <Button
        disabled={!isValid}
        label="Continue"
        size="lg"
        onPress={handleSubmit(onSubmit)}
      />
      {mutate.isError && (
        <ErrorOverlay error="Invalid details, Please try again" />
      )}
    </View>
  );
}

const ErrorOverlay = ({ error }: { error: string }) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(true);
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, [error]);

  if (!display) return null;

  return (
    <Animated.View
      entering={SlideInUp}
      exiting={SlideOutUp}
      className="absolute left-0 right-0 flex-row items-center gap-x-3 bg-red-600 px-5 py-7"
    >
      <AntDesign name="infocirlce" size={24} color="#FFFFFF" />
      <Text className="text-white">{error}</Text>
      <View className="flex-1" />
      <Button onPress={() => setDisplay(false)} size="icon" variant="ghost">
        <AntDesign name="close" size={24} color="#FFFFFF" />
      </Button>
    </Animated.View>
  );
};
