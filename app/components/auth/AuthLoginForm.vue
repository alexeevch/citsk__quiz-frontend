<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { userLoginSchema } from "~/utils/validadors/auth";
import type { FormSubmitEvent } from "@primevue/forms";
import { useAppToast } from "~/composables/useAppToast";
import type { AuthLoginDTO } from "~/types/api/Auth";

const { showWarn } = useAppToast();
const authStore = useAuthStore();

const { isLoading, error } = storeToRefs(authStore);
const resolver = ref(zodResolver(userLoginSchema));

const initialValues = reactive({
  email: "",
  password: ""
});

const onFormSubmit = async ({ values, valid }: FormSubmitEvent) => {
  if (!valid) return;

  try {
    await authStore.login(values as AuthLoginDTO);
    await navigateTo("/");
  } catch {
    showWarn("Не удалось войти в систему", error.value ?? "");
  }
};
</script>

<template>
  <Form
    v-slot="$form"
    class="sign-in__form"
    :initial-values
    :resolver
    :validate-on-blur="true"
    :validate-on-value-update="false"
    @submit="onFormSubmit"
  >
    <FormField
      v-slot="$field"
      class="sign-in__form-field"
      name="email"
      :initial-value="initialValues.email"
    >
      <InputText type="text" placeholder="Email" fluid />
      <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
        {{ $field.error?.message }}
      </Message>
    </FormField>

    <FormField
      v-slot="$field"
      class="sign-in__form-field"
      name="password"
      :initial-value="initialValues.password"
    >
      <Password placeholder="Пароль" :feedback="false" fluid toggle-mask />
      <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
        {{ $field.error?.message }}
      </Message>
    </FormField>

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

  &-field {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
}
</style>
