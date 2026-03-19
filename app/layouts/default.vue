<script setup lang="ts">
import { useLayout } from "~/composables/useLayout";
import AppSidebar from "~/components/layout/app-sidebar.vue";
import AppTopbar from "~/components/layout/app-topbar.vue";
import { useBreakpoints } from "~/composables/useBreakpoints";

const { isSidebarVisible, toggleSidebar } = useLayout();
const { isMobile } = useBreakpoints();
const { menu } = useAppConfig();
</script>

<template>
  <div class="layout" :class="{ 'layout--visible': isSidebarVisible }">
    <header class="layout__topbar">
      <AppTopbar />
    </header>

    <Transition name="sidebar">
      <aside v-show="isSidebarVisible" class="layout__sidebar">
        <AppSidebar :menu="menu.sidebarMenu" />
      </aside>
    </Transition>

    <main class="layout__main-container">
      <div class="layout__main">
        <NuxtPage />
      </div>
    </main>

    <Transition name="fade">
      <div
        v-if="isSidebarVisible && isMobile"
        class="layout__sidebar-backdrop"
        @click="toggleSidebar"
      />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/common/mixins" as mixins;

.layout {
  --sidebar-width: 18rem;
  --topbar-height: 4rem;
  --sidebar-top-offset: 4rem;
  --transition-duration: 0.2s;

  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
  position: relative;

  &__topbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--topbar-height);
    z-index: 50;
  }

  &__sidebar {
    position: fixed;
    top: var(--sidebar-top-offset);
    left: var(--padding-card-md);
    width: var(--sidebar-width);
    height: calc(100dvh - 8rem);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    z-index: 100;

    @include mixins.screensFrom("md") {
      top: 0;
      left: 0;
      width: calc(100dvw - 15%);
      height: 100dvh;
      padding: 1rem;
      background-color: var(--color-bg-card);
    }
  }

  &__main-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--sidebar-top-offset) var(--padding-card-md) 0;
    transition: left var(--transition-duration) ease;

    @include mixins.screensFrom("sm") {
      padding: var(--sidebar-top-offset) 0 0;
    }
  }

  &__main {
    flex: 1 1 auto;
    padding: var(--padding-card-md);
    background-color: var(--color-bg-card);
    border-radius: var(--border-radius-primary);

    @include mixins.screensFrom("sm") {
      padding: var(--padding-card-sm);
    }
  }

  &__sidebar-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
  }

  &--visible &__main-container {
    left: calc(var(--sidebar-width) + var(--padding-card-md));

    @include mixins.screensFrom("md") {
      left: 0;
    }
  }
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition:
    transform var(--transition-duration, 0.25s) ease,
    opacity var(--transition-duration, 0.25s) ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-110%);
  opacity: 0;
}

.sidebar-enter-to,
.sidebar-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
