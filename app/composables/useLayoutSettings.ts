import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";
import { defaultLayoutSettings, type LayoutSettings, type LayoutSidebarMode } from "~/types/Layout";

const STORAGE_KEY = "layout:settings";
const DARK_MODE_CSS_CLASS = "dark";

export function useLayoutSettings() {
  const settings = useLocalStorage<LayoutSettings>(STORAGE_KEY, defaultLayoutSettings, {
    mergeDefaults: true
  });

  const isSidebarOpen = computed(() => settings.value.sidebarOpen);

  function toggleSidebar() {
    settings.value.sidebarOpen = !settings.value.sidebarOpen;
  }

  function toggleDarkMode() {
    document.documentElement.classList.toggle(DARK_MODE_CSS_CLASS);
    settings.value.isDarkMode = !settings.value.isDarkMode;
  }

  function openSidebar() {
    settings.value.sidebarOpen = true;
  }

  function closeSidebar() {
    settings.value.sidebarOpen = false;
  }

  function setSidebarMode(mode: LayoutSidebarMode) {
    settings.value.sidebarMode = mode;
  }

  function toggleExpandedKey(key: string) {
    const idx = settings.value.expandedKeys.indexOf(key);
    if (idx === -1) {
      settings.value.expandedKeys = [...settings.value.expandedKeys, key];
    } else {
      settings.value.expandedKeys = settings.value.expandedKeys.filter((k) => k !== key);
    }
  }

  function isKeyExpanded(key: string) {
    return settings.value.expandedKeys.includes(key);
  }

  function resetSettings() {
    settings.value = { ...defaultLayoutSettings };
  }

  onBeforeMount(() => {
    settings.value.isDarkMode = document.documentElement.classList.contains(DARK_MODE_CSS_CLASS);
  });

  return {
    settings,
    isSidebarOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    setSidebarMode,
    toggleExpandedKey,
    isKeyExpanded,
    resetSettings,
    toggleDarkMode
  };
}
