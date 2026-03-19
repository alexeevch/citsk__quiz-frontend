<script setup lang="ts">
import { computed } from "vue";
import { useLayout } from "~/composables/useLayout";
import type { LayoutMenuItem } from "~/types/Layout";

const props = defineProps<{
  item: LayoutMenuItem;
  depth: number;
}>();

const { toggleExpandedKey, isKeyExpanded } = useLayout();

const hasChildren = computed(() => !!props.item.children?.length);
const isExpanded = computed(() => isKeyExpanded(props.item.key!));

function handleClick() {
  if (hasChildren.value) {
    toggleExpandedKey(props.item.key!);
  }
}

function onEnter(el: Element) {
  const element = el as HTMLElement;
  element.style.height = "0";
  element.offsetHeight;
  element.style.height = element.scrollHeight + "px";
}

function onAfterEnter(el: Element) {
  (el as HTMLElement).style.height = "auto";
}

function onLeave(el: Element) {
  const element = el as HTMLElement;
  element.style.height = element.scrollHeight + "px";
  element.offsetHeight;
  element.style.height = "0";
}
</script>

<template>
  <li v-if="!item.hidden" class="menu-item" :class="{ 'menu-item--parent': hasChildren }">
    <button
      v-if="hasChildren"
      class="menu-item__link menu-item__link--toggle"
      :class="{ 'menu-item__link--expanded': isExpanded }"
      @click="handleClick"
    >
      <i v-if="item.icon" :class="['menu-item__icon', item.icon]" />
      <span class="menu-item__label">{{ item.label }}</span>
      <i
        class="menu-item__chevron pi pi-chevron-down"
        :class="{ 'menu-item__chevron--expanded': isExpanded }"
      />
    </button>

    <NuxtLink
      v-else-if="item.to"
      class="menu-item__link"
      active-class="router-link-active"
      :to="item.to"
    >
      <i v-if="item.icon" :class="['menu-item__icon', item.icon]" />
      <span class="menu-item__label">{{ item.label }}</span>
    </NuxtLink>

    <span v-else class="menu-item__link menu-item__link--plain">
      <i v-if="item.icon" :class="['menu-item__icon', item.icon]" />
      <span class="menu-item__label">{{ item.label }}</span>
    </span>

    <Transition name="submenu" @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
      <ul v-show="hasChildren && isExpanded" class="menu-item__children">
        <AppMenuItem
          v-for="child in item.children"
          :key="child.key"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </Transition>
  </li>
</template>

<style lang="scss" scoped>
@use "~/assets/styles/common/functions" as *;

.menu-item {
  list-style: none;

  &__link {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    width: 100%;
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--color-text-primary);
    font-size: 0.9rem;
    font-weight: 400;
    text-decoration: none;
    transition:
      background 0.15s ease,
      color 0.15s ease;
    white-space: nowrap;
    overflow: hidden;
    border-radius: var(--border-radius-primary);

    &:hover {
      background-color: var(--color-bg-hover);
    }

    &.router-link-active {
      color: var(--color-primary);
    }

    &--toggle {
      user-select: none;
    }

    &--plain {
      cursor: default;
      &:hover {
        background: transparent;
        color: var(--text-color);
      }
    }
  }

  &__icon {
    font-size: 1rem;
    width: 1.2rem;
    flex-shrink: 0;
    color: var(--text-color-secondary);
    transition: color 0.15s ease;
  }

  &__label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__chevron {
    font-size: pxToRem(10);
    flex-shrink: 0;
    color: var(--text-color-secondary);
    transition: transform 0.2s ease;
    margin-left: auto;

    &--expanded {
      transform: rotate(180deg);
    }
  }

  &__children {
    padding: 0;
    margin: 0;
    margin-left: 1rem;
    overflow: hidden;
    transition:
      height 0.25s ease,
      opacity 0.2s ease;
  }
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
}
</style>
