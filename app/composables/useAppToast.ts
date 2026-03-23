import { useToast } from "primevue/usetoast";

export const useAppToast = () => {
  const toast = useToast();

  const showSuccess = (summary: string, detail?: string) => {
    toast.add({
      severity: "success",
      summary,
      detail,
      life: 3000
    });
  };

  const showError = (summary: string, detail?: string) => {
    toast.add({
      severity: "error",
      summary,
      detail,
      life: 4000
    });
  };

  const showInfo = (summary: string, detail?: string) => {
    toast.add({
      severity: "info",
      summary,
      detail,
      life: 3000
    });
  };

  const showWarn = (summary: string, detail?: string) => {
    toast.add({
      severity: "warn",
      summary,
      detail,
      life: 3000
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarn
  };
};
