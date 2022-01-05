import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
const Input = {
  baseStyle: {
    /**
     * Styles set within { variants } will override base styles
     * Styles set within { sizes } will override base styles
     * The Input component uses "md" size and "outline" variant by default.
     *
     * You can unset those defaults by using null in defaultProps:
     *    defaultProps: {
     *      size: null,
     *      variant: null
     *    },
     *
     * You will lose all default styles this way, including things like focus.
     */
    field: {
      // Add custom base styles here
    },
  },
  variants: {
    /**
     * Input component will use "outline" styles by default.
     * Styles set here will override anything in { baseStyle } and { sizes }
     *
     * The styles below are what Chakra will use unless replaced.
     */
    outline: {
      field: {
        background: "white",
        border: "1px solid",
        borderColor: "brand.200",
        _focus: {
          zIndex: 1,
          background: "white",
          borderColor: "brand.500",
          boxShadow: "0 0 0 1px brand.100",
        },
        _hover: { borderColor: "brand.300" },
      },
    },
  },
  defaultProps: {
    /**
     * Set either or both of these to null to use only what's in { baseStyle }
     */
    size: "md",
    variant: "outline",
  },
};

const theme = extendTheme(
  {
    styles: {
      global: {
        body: {
          backgroundColor: "transparent",
        },
      },
    },
    colors: {
      brand: {
        50: "#fcf2e5",
        100: "#e6dbc9",
        200: "#d3c4ac",
        300: "#c0ac8c",
        400: "#ad946c",
        500: "#947b52",
        600: "#73603f",
        700: "#52442c",
        800: "#322918",
        900: "#140e00",
      },
    },
    components: {
      Input,
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);

export default theme;
