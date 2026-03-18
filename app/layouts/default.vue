<script setup lang="ts">
const layout = useLayoutSettings();
</script>

<template>
  <div class="app-layout">
    <header>
      <Button @click="layout.toggleDarkMode()">toggle</Button>
    </header>
    <main class="main">
      <NuxtPage />
    </main>
    <footer>footer</footer>
  </div>
</template>
