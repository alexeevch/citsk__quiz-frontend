<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { userLoginSchema } from "~/utils/zod";
import type { FormSubmitEvent } from "@primevue/forms";
import { useAppToast } from "~/composables/useAppToast";
import type { AuthLoginDTO } from "~/types/api/Auth";

const { showWarn } = useAppToast();
const authStore = useAuthStore();

const { isLoading, error } = storeToRefs(authStore);
const resolver = ref(zodResolver(userLoginSchema));

const initialValues = ref({
  email: "",
  password: ""
});

const onFormSubmit = async ({ values, valid }: FormSubmitEvent) => {
  if (!valid) {
    showWarn("Проверьте правильность заполнения полей");
    return;
  }

  try {
    await authStore.login(values as AuthLoginDTO);
    await navigateTo("/");
  } catch {
    showWarn("Не удалось войти в систему", error.value ?? "");
  }
};
</script>

<template>
  <Form v-slot="$form" class="sign-in__form" :initial-values :resolver @submit="onFormSubmit">
    <div class="sign-in__form-field">
      <InputText name="email" type="text" placeholder="Email" fluid />
    </div>
    <div class="sign-in__form-field">
      <Password name="password" placeholder="Пароль" :feedback="false" fluid toggle-mask />
    </div>
    <Button
      type="submit"
      label="Войти"
      :icon="isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-sign-in'"
      :disabled="!$form.valid || isLoading"
    />
  </Form>
</template>

<style lang="scss" scoped>
.sign-in__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--padding-card-sm);
  padding: var(--padding-card-sm);
  border-radius: var(--border-radius-primary);
  background-color: var(--color-bg-card);
}
</style>
