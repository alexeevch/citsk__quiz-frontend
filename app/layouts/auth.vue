<script setup lang="ts">
import { useLayout } from "~/composables/useLayout";

const layout = useLayout();
</script>

<template>
  <div class="auth">
    <header class="auth__header">
      <Button text rounded severity="secondary" @click="layout.toggleDarkMode">
        <i :class="layout.settings.value.isDarkMode ? 'pi pi-sun' : 'pi pi-moon'" />
      </Button>
    </header>
    <main class="auth__main">
      <NuxtPage />
    </main>
    <footer class="auth__footer">footer</footer>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/styles/common/mixins" as mixins;

.auth {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
  padding: 0 var(--padding-card-md);

  @include mixins.screensFrom("sm") {
    padding: 0 var(--padding-card-sm);
  }

  &__header,
  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem 0;
  }

  &__header {
    color: var(--color-text-gray);
  }

  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  &__footer {
    color: var(--color-text-gray);
  }
}
</style>
