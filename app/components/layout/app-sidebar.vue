<script setup lang="ts">
import type { LayoutMenuItem } from "~/types/Layout";
import AppMenuItem from "~/components/layout/app-menu-item.vue";

defineProps<{
  menu: LayoutMenuItem[];
}>();
</script>

<template>
  <nav class="navigation">
    <template v-for="group in menu" :key="group.label ?? 'default'">
      <p v-if="group.label" class="navigation__group-label">{{ group.label }}</p>
      <ul class="navigation__menu-list">
        <AppMenuItem v-for="item in group.items" :key="item.key" :item="item" :depth="0" />
      </ul>
    </template>
  </nav>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/common/functions" as *;
@use "~/assets/styles/common/mixins" as mixins;

.navigation {
  height: 100%;
  min-height: 100%;
  scrollbar-width: thin;
  scrollbar-color: var(--surface-border) transparent;

  &__group-label {
    padding: 0.5rem 1rem;
    font-size: pxToRem(12);
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-color-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }

  &__menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
