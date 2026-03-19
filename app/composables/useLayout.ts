import { useLocalStorage } from "@vueuse/core";
import { defaultLayoutSettings, type LayoutSettings } from "~/types/Layout";
import { useBreakpoints } from "~/composables/useBreakpoints";

const STORAGE_KEY = "layout:settings";
const DARK_MODE_CSS_CLASS = "dark";

const settings = useLocalStorage<LayoutSettings>(STORAGE_KEY, defaultLayoutSettings, {
  mergeDefaults: true
});

const { isMobile } = useBreakpoints();

const isMobileMenuVisible = ref<boolean>(false);

const isSidebarVisible = computed(() => {
  return isMobile.value ? isMobileMenuVisible.value : settings.value.isSidebarPinned;
});

watch(isMobile, (newValue) => {
  if (!newValue) isMobileMenuVisible.value = false;
});

if (import.meta.client) {
  settings.value.isDarkMode = document.documentElement.classList.contains(DARK_MODE_CSS_CLASS);
}

const expandedKeysSet = computed(() => new Set(settings.value.expandedKeys));

export function useLayout() {
  function toggleSidebar() {
    if (isMobile.value) {
      isMobileMenuVisible.value = !isMobileMenuVisible.value;
    } else {
      settings.value.isSidebarPinned = !settings.value.isSidebarPinned;
    }
  }

  function toggleSidebarPinned() {
    settings.value.isSidebarPinned = !settings.value.isSidebarPinned;
  }

  function openMobileMenu() {
    isMobileMenuVisible.value = true;
  }

  function closeMobileMenu() {
    isMobileMenuVisible.value = false;
  }

  function toggleDarkMode() {
    document.documentElement.classList.toggle(DARK_MODE_CSS_CLASS);
    settings.value.isDarkMode = !settings.value.isDarkMode;
  }

  function toggleExpandedKey(key: string) {
    const keys = settings.value.expandedKeys;
    const idx = keys.indexOf(key);
    if (idx === -1) {
      keys.push(key);
    } else {
      keys.splice(idx, 1);
    }
  }

  function isKeyExpanded(key: string) {
    return expandedKeysSet.value.has(key);
  }

  function resetSettings() {
    settings.value = { ...defaultLayoutSettings };
  }

  return {
    settings,
    isMobileMenuVisible,
    isSidebarVisible,
    toggleSidebar,
    toggleSidebarPinned,
    openMobileMenu,
    closeMobileMenu,
    toggleExpandedKey,
    isKeyExpanded,
    resetSettings,
    toggleDarkMode
  };
}
