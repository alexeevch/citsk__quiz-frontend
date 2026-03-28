<script setup lang="ts">
const appName = useRuntimeConfig().public.appName;
const pageName = "Викторины";

useSeoMeta({
  title: `${pageName} - ${appName}`
});

definePageMeta({
  permissions: ["api.view_quiz"],
  breadcrumb: pageName
});
</script>

<template>
  <QuizSection :title="pageName" />
</template>
