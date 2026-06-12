import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import { PropsWithChildren } from "react";
import { Text, View } from "react-native";

type DataTimePickerProps<T extends FieldValues> = {
  label?: string;
  mode?: "date" | "time" | "datetime";
} & Omit<ControllerProps<T>, "render">;

const DataTimePicker = <T extends FieldValues>({
  label,
  mode = "date",
  ...props
}: PropsWithChildren<DataTimePickerProps<T>>) => {
  const inputType = mode === "time" ? "time" : mode === "datetime" ? "datetime-local" : "date";

  return (
    <View className="gap-y-2">
      {label && <Text className="font-semibold">{label}</Text>}
      <Controller
        {...props}
        render={({ field: { onChange, value } }) => (
          <input
            type={inputType}
            value={
              value instanceof Date
                ? value.toISOString().split("T")[0]
                : (value ?? "")
            }
            onChange={(e) =>
              onChange(e.target.value ? new Date(e.target.value) : undefined)
            }
            style={{
              borderRadius: 8,
              border: "1px solid #9ca3af",
              padding: "14px 12px",
              fontSize: 16,
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
              backgroundColor: "white",
            }}
          />
        )}
      />
    </View>
  );
};

export { DataTimePicker };
