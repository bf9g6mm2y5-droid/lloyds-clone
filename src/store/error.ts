import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

let _timeoutId: ReturnType<typeof setTimeout> | null = null;

const useError = create(
  devtools(
    combine({ toast: false, error: null as any }, (set) => ({
      showToast: (error: any) => {
        if (_timeoutId) clearTimeout(_timeoutId);

        set({ toast: true, error });

        _timeoutId = setTimeout(() => {
          set({ toast: false, error: null });
          _timeoutId = null;
        }, 5000);
      },
    })),
  ),
);

export default useError;
