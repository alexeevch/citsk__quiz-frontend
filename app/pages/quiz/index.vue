<script setup lang="ts">
const appName = useRuntimeConfig().public.appName;
const pageName = "Викторины";

useSeoMeta({
  title: `${pageName} - ${appName}`
});
</script>

<template>
  <div>
    <h1>{{ pageName }}</h1>
  </div>
</template>
