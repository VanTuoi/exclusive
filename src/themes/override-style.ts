import { ThemeOption } from "~/types";

export default function OverrideStyles(theme: ThemeOption) {
    return {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: theme.colors.paper
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    fontSize: "16px",
                    borderRadius: "4px",
                    "&.MuiButton-sizeLarge": {
                        height: "56px"
                    }
                },
                contained: {
                    backgroundColor: theme.colors.buttonPrimaryMain,
                    color: theme.colors.textSecondaryLight,
                    border: "none",
                    "&:hover": {
                        backgroundColor: theme.colors.buttonPrimaryLight,
                        border: "none"
                    }
                },
                outlined: {
                    border: `1px solid ${theme.colors.grey500}`,
                    color: theme.colors.textPrimaryMain,
                    backgroundColor: "transparent",
                    "&:hover": {
                        border: `1px solid ${theme.colors.buttonPrimaryMain}`,
                        color: theme.colors.buttonPrimaryMain
                    }
                },
                text: {
                    color: theme.colors.buttonPrimaryMain,
                    backgroundColor: "transparent",
                    border: "1px solid transparent",
                    "&:hover": {
                        border: `1px solid ${theme.colors.buttonPrimaryMain}`
                    }
                }
            }
        },
        MuiIconButton: {
            variants: [
                {
                    props: { variant: "outlined" as const },
                    style: () => ({
                        "&:hover": {
                            cursor: "pointer",
                            backgroundColor: theme.colors.buttonPrimaryMain,
                            "& > *": {
                                filter: "brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(278deg) brightness(106%) contrast(101%)",
                                transition: "filter 0.3s ease"
                            }
                        }
                    })
                },
                {
                    props: { variant: "contained" as const },
                    style: () => ({
                        padding: "4px",
                        color: theme.colors.paper,
                        backgroundColor: theme.colors.buttonPrimaryMain,
                        transition: "background-color 0.5s ease, color 0.5s ease",
                        "&:hover": {
                            backgroundColor: theme.colors.buttonPrimaryLight,
                            color: theme.colors.paper
                        }
                    })
                },
                {
                    props: { variant: "text" as const },
                    style: () => ({
                        "& > *": {
                            color: theme.colors.textPrimaryMain,
                            transition: "filter 0.3s ease"
                        }
                    })
                },
                {
                    props: { variant: "default" as const },
                    style: () => ({
                        padding: "4px",
                        color: theme.colors.textPrimaryMain,
                        transition: "background-color 0.5s ease, color 0.5s ease",
                        backgroundColor: theme.colors.grey50,
                        "&:hover": {
                            backgroundColor: theme.colors.secondaryMain,
                            color: theme.colors.paper
                        }
                    })
                }
            ]
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-root": {
                        borderRadius: "4px"
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            border: `1px solid ${theme.colors.grey500}`
                        },
                        "&:hover fieldset": {},
                        "&.Mui-focused fieldset": {}
                    }
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: "none"
                },
                rounded: {
                    borderRadius: `${theme?.borderRadius}px`
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: theme.colors?.neutral50
                },
                title: {
                    fontSize: "1.125rem"
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: "24px"
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: "24px"
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: 0,
                    paddingRight: 0,
                    "@media (min-width: 480px)": {
                        paddingLeft: 0,
                        paddingRight: 0
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: `${theme.borderRadius}px`
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.colors.grey500
                }
            }
        }
    };
}
