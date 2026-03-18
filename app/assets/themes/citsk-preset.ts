import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const AppPreset = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: "0",
      xs: "0.125rem", // 2px
      sm: "0.25rem", // 4px
      md: "0.75rem", // 12px
      lg: "1.5rem", // 24px
      xl: "2.875rem" // 46px
    }
  },
  semantic: {
    primary: {
      0: "#FFFFFF",
      50: "#E6ECFF",
      100: "#D2DDFF",
      200: "#B5C7FF",
      300: "#8DA8FF",
      400: "#6E90FF",
      500: "#5C82FF",
      600: "#426EFF",
      700: "#3C61DB",
      800: "#2E4694",
      900: "#1B2F71",
      950: "#13204B",
      1000: "#14141F"
    },
    colorScheme: {
      light: {
        primary: {
          color: "{primary.600}",
          contrastColor: "#ffffff",
          hoverColor: "{primary.700}",
          activeColor: "{primary.800}",
          textColor: "primary.0"
        },
        surface: {
          ground: "{primary.0}",
          0: "{primary.0}",
          50: "{primary.50}",
          100: "{primary.100}",
          200: "{primary.200}",
          300: "{primary.300}",
          400: "{primary.400}",
          500: "{primary.500}",
          600: "{primary.600}",
          700: "{primary.700}",
          800: "{primary.800}",
          900: "{primary.900}",
          950: "{primary.950}",
          1000: "{primary.1000}"
        }
      },
      dark: {
        surface: {
          ground: "{primary.1000}"
        },
        primary: {
          color: "{primary.600}",
          contrastColor: "{primary.0}",
          hoverColor: "{primary.700}",
          activeColor: "{primary.800}"
        }
      }
    }
  },
  components: {
    button: {
      root: {
        roundedBorderRadius: "{borderRadius.lg}"
      },
      colorScheme: {
        light: {
          //
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
