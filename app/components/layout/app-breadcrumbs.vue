<script setup lang="ts">
const { items, home } = useBreadcrumbs();
</script>

<template>
  <Breadcrumb class="breadcrumb" :home="home" :model="items">
    <template #item="{ item, props }">
      <span v-if="item?.textOnly" class="breadcrumb__item">
        {{ item.label }}
      </span>
      <router-link
        v-else-if="item.route"
        v-slot="{ href, navigate }"
        class="breadcrumb__item"
        :to="item.route"
        custom
      >
        <a :href="href" v-bind="props.action" @click="navigate">
          <span v-if="item.icon" :class="[item.icon, 'text-color']" />
          <span>{{ item.label }}</span>
        </a>
      </router-link>
      <a
        v-else
        :href="item.url"
        :target="item.target"
        v-bind="props.action"
        class="breadcrumb__item"
      >
        <span>{{ item.label }}</span>
      </a>
    </template>
    <template #separator><span class="breadcrumb__item">/</span></template>
  </Breadcrumb>
</template>

<style scoped lang="scss">
.breadcrumb {
  padding-bottom: var(--padding-layout-md);
  &__item {
    color: var(--color-text-gray) !important;
  }
}
</style>
