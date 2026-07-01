import { createTransaction } from "@/api/transaction";
import { PaymentAccount } from "@/components/cards";
import { Button, InlineLabelTextInput } from "@/components/ui";
import { TransactionType } from "@/constants/transactions";
import { usePayee, usePaymentAccount, usePaymentActions } from "@/store";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

const createTransactionFormSchema = (balance?: number) =>
  z.object({
    amount: z.coerce
      .number()
      .positive()
      .gte(10, "Minimum amount is £10")
      .lte(balance ?? Infinity, "Insufficient funds"),
    ref: z.string().optional(),
  });

type CreateTransactionForm = z.infer<
  ReturnType<typeof createTransactionFormSchema>
>;

export default function Page() {
  const router = useRouter();

  const account = usePaymentAccount();
  const payee = usePayee();
  const { setTransaction } = usePaymentActions();

  const { bottom } = useSafeAreaInsets();

  const mutate = useMutation({
    mutationFn: createTransaction,
    onSuccess: (data) => {
      setTransaction(data);
      router.push("/success");
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreateTransactionForm>({
    resolver: zodResolver(createTransactionFormSchema(account?.balance)),
    reValidateMode: "onChange",
    mode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<CreateTransactionForm> = (data) => {
    if (!account || !payee) return;
    mutate.mutate({
      amount: -data.amount,
      ref: data.ref,
      accountId: account.id,
      accountName: payee.name,
    });
  };

  return (
    <View
      className="flex-1 gap-y-5 px-4 pt-5"
      style={{ paddingBottom: bottom }}
    >
      <Text className="text-sm font-semibold">From:</Text>
      {!account ? (
        <PaymentAccount.Skeleton />
      ) : (
        <PaymentAccount.Card account={account} />
      )}

      <Text className="text-sm font-semibold">To:</Text>

      {
        // TODO: Use skeleton
      }
      <Link asChild href="/select-payee">
        <Pressable className="flex-row items-center gap-x-4 rounded-xl bg-white px-4 py-5">
          <Feather name="user" size={28} color="#1b1b1b" />

          <View className="gap-y-1">
            <Text className="font-semibold uppercase">{payee?.name}</Text>
            <Text className="text-sm text-gray-600">
              {payee?.sortCode} / {payee?.accountNumber}
            </Text>
          </View>
          <View className="flex-1" />
          <FontAwesome name="angle-right" size={24} color="black" />
        </Pressable>
      </Link>

      <View className="gap-y-4 rounded-xl bg-white px-4 py-5">
        <View>
          <InlineLabelTextInput
            label="Amount: "
            control={control}
            name="amount"
            numberOfLines={1}
            keyboardType="numeric"
          />

          <Link href="/" asChild>
            <Button
              label="View payment limits"
              variant="link"
              size="sm"
              className="m-0 self-start p-0 underline"
              textClassName="font-light"
            />
          </Link>
        </View>
        <InlineLabelTextInput
          label="Ref:"
          maxLength={10}
          numberOfLines={1}
          control={control}
          name="ref"
        />
      </View>

      <View className="flex-1" />

      <Button
        label="Continue"
        size="lg"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      />
    </View>
  );
}
