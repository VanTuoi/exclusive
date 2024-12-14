import { Box, useTheme } from "@mui/material";
import { memo, ReactNode } from "react";

import { styles } from "~/style/common/empty-layout";

interface RootLayoutProps {
    children: ReactNode;
}

const EmptyLayout = memo(({ children }: RootLayoutProps) => {
    const theme = useTheme();

    return <Box sx={styles.mainBoxStyles(theme)}>{children}</Box>;
});
export { EmptyLayout };
