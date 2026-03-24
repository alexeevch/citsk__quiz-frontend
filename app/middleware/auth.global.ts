export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  if (!authStore.isInitialized) {
    await authStore.initAuth();
  }

  const { isAuthenticated } = storeToRefs(authStore);

  if (!to.meta.guestOnly && !to.meta.public && !isAuthenticated.value) {
    return navigateTo("/auth/sign-in");
  }

  if (to.meta.guestOnly && isAuthenticated.value) {
    return navigateTo("/");
  }
});
