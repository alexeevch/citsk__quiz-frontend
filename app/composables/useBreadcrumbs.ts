import { useRoute } from "vue-router";

type SegmentConfig = {
  label: string;
  disabled: boolean;
};

const SEGMENT_LABELS: Record<string, SegmentConfig> = {
  admin: { label: "Администрирование", disabled: true },
  quiz: { label: "Викторины", disabled: false }
};
export function useBreadcrumbs() {
  const route = useRoute();

  const items = computed(() => {
    const crumbs: { label: string; route: string; textOnly: boolean }[] = [];
    const segments = route.path.split("/").filter(Boolean);

    let path = "";
    segments.forEach((segment) => {
      path += `/${segment}`;

      const matched = route.matched.find((r) => {
        const normalizedPath = r.path
          .replace(/:([^/]+)/g, (_, key) => route.params[key] as string)
          .replace(/\[([^\]]+)\]/g, (_, key) => route.params[key] as string);
        return normalizedPath === path;
      });

      const metaLabel = matched?.meta?.breadcrumb as string | undefined;
      const dictLabel = SEGMENT_LABELS[segment];
      const fallbackLabel = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

      crumbs.push({
        label: metaLabel ?? dictLabel?.label ?? fallbackLabel,
        route: path,
        textOnly: !!dictLabel?.disabled
      });
    });

    return crumbs;
  });

  const home = { label: "Главная", route: "/" };

  return { items, home };
}
