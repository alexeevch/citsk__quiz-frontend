<script setup lang="ts">
const appName = useRuntimeConfig().public.appName;
definePageMeta({
  layout: "auth"
});
</script>

<template>
  <div class="sign-in">
    <div class="sign-in__branding">
      <div class="sign-in__logo">
        <NuxtImg width="80" src="/images/logo-primary.png" />
      </div>
      <div class="sign-in__title">
        <h1 class="sign-in__label">Аутентификация</h1>
        <p class="sign-in__app-name">{{ appName }}</p>
      </div>
    </div>
    <Form v-slot="$form" class="sign-in__form" :initialValues :resolver @submit="onFormSubmit">
      <div class="sign-in__form-field">
        <InputText name="login" type="text" placeholder="Email" fluid />
      </div>
      <div class="sign-in__form-field">
        <Password name="password" placeholder="Password" :feedback="false" fluid toggle-mask />
      </div>
      <Button icon="pi pi-sign-in" label="Войти" />
    </Form>
  </div>
</template>

<style scoped lang="scss">
.test {
  color: var(--color-text-gray);
}
.sign-in {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--padding-card-md);

  &__branding {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--padding-card-sm);
    text-align: center;
  }

  &__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--padding-card-sm);
    padding: var(--padding-card-sm);
    border-radius: var(--border-radius-primary);
    background-color: var(--color-bg-card);
  }
}
</style>
