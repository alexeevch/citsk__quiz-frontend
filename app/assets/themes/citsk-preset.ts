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
          shadow: "0 0 0 4px {surface.200}"
        },
        dark: {
          color: "{surface.900}",
          background: "{surface.100}",
          shadow: "0 0 0 4px {surface.200}"
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
    },
    datatable: {
      colorScheme: {
        dark: {
          root: {
            background: "transparent"
          },
          header: {
            background: "transparent"
          },
          headerCell: {
            background: "transparent",
            hoverBackground: "{surface.200}",
            color: "{surface.600}",
            borderColor: "{surface.200}"
          },
          row: {
            background: "transparent",
            hoverBackground: "{surface.200}",
            color: "{surface.800}",
            hoverColor: "surface.900"
          },
          bodyCell: {
            borderColor: "{surface.200}"
          },
          footer: {
            background: "transparent"
          }
        }
      }
    },
    drawer: {
      root: {
        title: {
          fontSize: "1rem"
        }
      },
      colorScheme: {
        dark: {
          color: "{surface.800}",
          background: "{surface.100}",
          borderColor: "{surface.200}"
        }
      }
    },
    select: {
      colorScheme: {
        dark: {
          overlay: {
            background: "{surface.200}",
            borderColor: "{surface.300}",
            color: "{surface.600}"
          },
          option: {
            color: "{surface.700}",
            focusBackground: "{surface.400}",
            focusColor: "{surface.900}"
          }
        }
      }
    },
    menu: {
      colorScheme: {
        dark: {
          background: "{surface.200}",
          borderColor: "{surface.300}",
          item: {
            color: "{surface.700}",
            focusBackground: "{surface.400}",
            focusColor: "{surface.900}",
            icon: {
              focusColor: "{surface.900}"
            }
          }
        }
      }
    },
    button: {
      colorScheme: {
        dark: {
          root: {
            secondary: {
              background: "{surface.200}",
              hoverBackground: "{surface.300}",
              color: "{surface.700}",
              hoverColor: "{surface.800}",
              borderColor: "{surface.300}",
              hoverBorderColor: "{surface.400}"
            }
          }
        }
      }
    },
    tag: {
      colorScheme: {
        dark: {
          secondary: {
            background: "{surface.200}",
            color: "{surface.600}"
          }
        }
      }
    },
    popover: {
      colorScheme: {
        dark: {
          background: "{surface.200}",
          color: "{surface.600}",
          borderColor: "{surface.300}"
        }
      }
    },
    togglebutton: {
      colorScheme: {
        dark: {
          root: {
            background: "{surface.200}",
            color: "{surface.600}",
            borderColor: "{surface.300}",
            hoverBackground: "{surface.400}",
            hoverColor: "{surface.800}",

            checked: {
              background: "{surface.200}",
              color: "{surface.800}",
              borderColor: "{surface.300}"
            },

            content: {
              checked: {
                background: "{surface.400}"
              }
            }
          }
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
