declare const _default: {
    baseStyle: {
        cursor: string;
        border: string;
        lineHeight: string;
        borderRadius: string;
        fontWeight: string;
        transitionProperty: string;
        transitionDuration: string;
        _focus: {
            boxShadow: string;
        };
        _disabled: {
            opacity: number;
            cursor: string;
            boxShadow: string;
        };
        _hover: {
            _disabled: {
                bg: string;
            };
        };
    };
    variants: {
        ghost: (props: any) => {
            color: unknown;
            _hover: {
                bg: unknown;
            };
            _active: {
                bg: unknown;
            };
            bg?: undefined;
        } | {
            color: unknown;
            bg: string;
            _hover: {
                bg: unknown;
            };
            _active: {
                bg: unknown;
            };
        };
        outline: (props: any) => {
            color: unknown;
            _hover: {
                bg: unknown;
            };
            _active: {
                bg: unknown;
            };
            bg?: undefined;
            border: string;
            borderColor: unknown;
        } | {
            color: unknown;
            bg: string;
            _hover: {
                bg: unknown;
            };
            _active: {
                bg: unknown;
            };
            border: string;
            borderColor: unknown;
        };
        solid: (props: any) => {
            bg: unknown;
            _hover: {
                bg: unknown;
                _disabled: {
                    bg: unknown;
                };
            };
            _active: {
                bg: unknown;
            };
            color?: undefined;
        } | {
            bg: unknown;
            color: unknown;
            _hover: {
                bg: unknown;
                _disabled: {
                    bg: unknown;
                };
            };
            _active: {
                bg: unknown;
            };
        };
        link: (props: any) => {
            padding: number;
            height: string;
            lineHeight: string;
            verticalAlign: string;
            color: unknown;
            _hover: {
                textDecoration: string;
                _disabled: {
                    textDecoration: string;
                };
            };
            _active: {
                color: unknown;
            };
        };
        unstyled: {
            bg: string;
            color: string;
            display: string;
            lineHeight: string;
            m: number;
            p: number;
        };
    };
    sizes: {
        lg: {
            h: number;
            minW: number;
            fontSize: string;
            px: number;
        };
        md: {
            h: number;
            minW: number;
            fontSize: string;
            px: number;
        };
        sm: {
            h: number;
            minW: number;
            fontSize: string;
            px: number;
        };
        xs: {
            h: number;
            minW: number;
            fontSize: string;
            px: number;
        };
    };
    defaultProps: {
        variant: string;
        size: string;
        colorScheme: string;
    };
};
export default _default;
