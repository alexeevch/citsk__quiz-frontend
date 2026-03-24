<script setup lang="ts">
const appName = useRuntimeConfig().public.appName;
definePageMeta({
  layout: "auth",
  guestOnly: true
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
    <AuthLoginForm />
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

  &__label {
    margin: 0;
  }
}
</style>
