<script setup lang="ts">
const slots = useSlots();
</script>

<template>
  <div class="layout-section">
    <div class="layout-section__main" :class="{ 'layout-section__main--full': !slots.aside }">
      <div class="layout-section__content" :style="slots.footer ? 'padding-bottom: 2rem' : ''">
        <slot />
      </div>
      <aside v-if="slots.aside" class="layout-section__aside">
        <slot name="aside" />
      </aside>
    </div>

    <footer v-if="slots.footer" class="layout-section__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/styles/common/mixins.scss" as mixins;

.layout-section {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: calc(100% - (2 * var(--padding-card-md)));

  &__main {
    display: grid;
    grid-template-columns: minmax(0, 6fr) minmax(0, 3fr);
    gap: 2rem;
    flex: 1;

    @include mixins.screensFrom("sm") {
      grid-template-columns: 1fr;
    }

    &--full {
      grid-template-columns: 1fr;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
    align-content: start;
    width: 100%;

    @include mixins.screensTo("md") {
      padding-bottom: var(--padding-card-md);
    }
  }

  &__aside {
    width: 100%;
  }

  &__footer {
    position: sticky;
    width: 100%;
    bottom: calc(var(--padding-layout-md) * -1);
    background-color: var(--color-bg-card);
    padding: 0.5rem 0;
  }
}
</style>
