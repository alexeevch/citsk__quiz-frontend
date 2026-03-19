<script setup lang="ts">
import { useLayout } from "~/composables/useLayout";

const layout = useLayout();
</script>

<template>
  <header class="topbar">
    <div class="topbar__left">
      <Button
        text
        rounded
        severity="primary"
        class="topbar__menu-btn"
        @click="layout.toggleSidebar"
      >
        <i class="pi pi-bars" />
      </Button>

      <slot name="logo">
        <div class="topbar__logo">
          <span>Эрудит-бот</span>
        </div>
      </slot>
    </div>

    <div class="topbar__right">
      <slot name="actions" />

      <Button text rounded severity="secondary" @click="layout.toggleDarkMode">
        <i :class="layout.settings.value.isDarkMode ? 'pi pi-sun' : 'pi pi-moon'" />
      </Button>

      <slot name="user">
        <Button text rounded severity="secondary">
          <i class="pi pi-user" />
        </Button>
      </slot>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/common/functions" as *;

.topbar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--padding-card);

  &__left,
  &_right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__logo {
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--color-text-primary);
  }
}
</style>
