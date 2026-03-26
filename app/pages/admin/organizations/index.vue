<script setup lang="ts">
const appName = useRuntimeConfig().public.appName;
const pageName = "Организации";

useSeoMeta({
  title: `${pageName} - ${appName}`
});

definePageMeta({
  permissions: [
    "api.view_organization",
    "api.add_organization",
    "api.change_organization",
    "api.delete_organization"
  ],
  permissionMode: "all",
  breadcrumb: pageName
});
</script>

<template>
  <div class="organization-page">
    <AdminOrganizationSection>
      <template #title>
        <h1 class="organization-page__title">{{ pageName }}</h1>
      </template>
    </AdminOrganizationSection>
  </div>
</template>

<style scoped lang="scss">
.organization-page {
  &__title {
    margin: 0;
    padding: 0;
  }
}
</style>
