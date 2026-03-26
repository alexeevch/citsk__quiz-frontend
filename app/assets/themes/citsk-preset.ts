import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const AppPreset = definePreset(Aura, {
  semantic: {
    fontSize: "0.875rem",
    primary: {
      0: "#FFFFFF",
      50: "#EFF4FF",
      100: "#DBEAFE",
      200: "#BFDBFE",
      300: "#93C5FD",
      400: "#60A5FA",
      500: "#3B82F6",
      600: "#2563EB",
      700: "#1D4ED8",
      800: "#1E40AF",
      900: "#1E3A8A",
      950: "#172554",
      1000: "#0F172A"
    },

    colorScheme: {
      light: {
        primary: {
          color: "{primary.600}",
          contrastColor: "#ffffff",
          hoverColor: "{primary.700}",
          activeColor: "{primary.800}"
        },
        surface: {
          ground: "#F1F5F9",
          0: "#FFFFFF",
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#090E1A",
          1000: "#020408"
        },
        highlight: {
          background: "{primary.600}",
          focusBackground: "{primary.700}",
          color: "#ffffff",
          focusColor: "#ffffff"
        },
        formField: {
          background: "{surface.0}",
          disabledBackground: "{surface.200}",
          filledBackground: "{surface.100}",
          filledFocusBackground: "{surface.100}",
          borderColor: "{surface.300}",
          hoverBorderColor: "{surface.400}",
          focusBorderColor: "{primary.600}",
          invalidBorderColor: "{red.600}",
          color: "{surface.800}",
          disabledColor: "{surface.400}",
          placeholderColor: "{surface.400}",
          floatLabelColor: "{surface.400}",
          floatLabelFocusColor: "{primary.600}",
          floatLabelActiveColor: "{surface.500}",
          iconColor: "{surface.400}",
          shadow: "none"
        }
      },

      dark: {
        primary: {
          color: "{primary.500}",
          contrastColor: "#ffffff",
          hoverColor: "{primary.400}",
          activeColor: "{primary.600}"
        },
        surface: {
          ground: "#0F172A",
          0: "#020408",
          50: "#0F172A",
          100: "#1E293B",
          200: "#334155",
          300: "#475569",
          400: "#64748B",
          500: "#94A3B8",
          600: "#CBD5E1",
          700: "#E2E8F0",
          800: "#F1F5F9",
          900: "#F8FAFC",
          950: "#FCFDFE",
          1000: "#FFFFFF"
        },
        highlight: {
          background: "color-mix(in srgb, {primary.400}, transparent 84%)",
          focusBackground: "color-mix(in srgb, {primary.400}, transparent 76%)",
          color: "{primary.200}",
          focusColor: "{primary.100}"
        },
        formField: {
          background: "{surface.200}",
          disabledBackground: "{surface.500}",
          filledBackground: "{surface.200}",
          filledFocusBackground: "{surface.200}",
          borderColor: "{surface.300}",
          hoverBorderColor: "{surface.400}",
          focusBorderColor: "{primary.500}",
          invalidBorderColor: "{red.400}",
          color: "{surface.800}",
          disabledColor: "{surface.300}",
          placeholderColor: "{surface.400}",
          floatLabelColor: "{surface.400}",
          floatLabelFocusColor: "{primary.400}",
          floatLabelActiveColor: "{surface.500}",
          iconColor: "{surface.400}",
          shadow: "none"
        }
      }
    }
  },
  components: {
    card: {
      colorScheme: {
        light: {
          background: "{surface.0}",
          shadow: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)"
        },
        dark: {
          background: "{surface.100}",
          shadow: "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.2)"
        }
      }
    },
    toast: {
      colorScheme: {
        dark: {
          info: { detailColor: "#FFFFFF" },
          success: { detailColor: "#FFFFFF" },
          warn: { detailColor: "#FFFFFF" },
          error: { detailColor: "#FFFFFF" }
        }
      },
      summary: {
        fontSize: "0.875rem"
      },
      detail: {
        fontSize: "0.875rem"
      }
    },
    breadcrumb: {
      root: {
        padding: "0"
      },
      colorScheme: {
        dark: {
          background: "transparent"
        }
      }
    }
  }
});

export default {
  preset: AppPreset,
  options: {
    darkModeSelector: ".dark"
  }
};
