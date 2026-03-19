import { useWindowSize } from "@vueuse/core";

const MOBILE_BREAKPOINT = 768;

export const useBreakpoints = () => {
  const { width, height } = useWindowSize();

  const isMobile = computed(() => width.value <= MOBILE_BREAKPOINT);
  const isDesktop = computed(() => width.value > MOBILE_BREAKPOINT);

  return { isMobile, isDesktop, width, height };
};
