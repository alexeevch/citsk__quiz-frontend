<script setup lang="ts">
const appName = useRuntimeConfig().public.appName;

useSeoMeta({
  title: `Дашборд - ${appName}`
});
</script>

<template><div>homepage</div></template>
