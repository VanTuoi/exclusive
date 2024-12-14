import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { FC, ReactNode, SyntheticEvent, useState } from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, width: "100%" }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`
    };
}

interface NestedTab {
    [sectionTitle: string]: string[];
}

interface VerticalTabsProps {
    tabs: NestedTab[];
    children: ReactNode[];
}

const VerticalTabs: FC<VerticalTabsProps> = ({ tabs, children }) => {
    const theme = useTheme();

    const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const handleSectionChange = (event: SyntheticEvent, newValue: number) => {
        setSelectedSectionIndex(newValue);
        setSelectedTabIndex(0);
    };

    const handleTabChange = (newValue: number) => {
        setSelectedTabIndex(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: "auto", minHeight: "400px" }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={selectedSectionIndex}
                onChange={handleSectionChange}
                aria-label="Vertical tabs example"
                sx={{
                    minWidth: "300px",
                    "& .MuiTabs-indicator": {
                        display: "none"
                    }
                }}
            >
                {tabs.map((section, sectionIndex) => {
                    const sectionTitle = Object.keys(section)[0];
                    const subTabs = section[sectionTitle];

                    return (
                        <Box
                            key={sectionIndex}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "flex-start"
                            }}
                        >
                            {subTabs.length === 1 ? (
                                <Tab
                                    sx={{
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        color: theme.palette.background.default
                                    }}
                                    key={0}
                                    label={subTabs[0]}
                                    onClick={() => handleTabChange(0)}
                                    tabIndex={sectionIndex}
                                    {...a11yProps(0)}
                                />
                            ) : (
                                <>
                                    <Typography variant="h4" sx={{ p: 1 }}>
                                        {sectionTitle}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            paddingLeft: 2
                                        }}
                                    >
                                        {subTabs.map((subTab, subTabIndex) => (
                                            <Tab
                                                sx={{
                                                    fontSize: "16px",
                                                    lineHeight: "24px",
                                                    color: theme.palette.background.default
                                                }}
                                                key={subTabIndex}
                                                label={subTab}
                                                onClick={() => handleTabChange(subTabIndex)}
                                                tabIndex={sectionIndex * 10 + subTabIndex}
                                                {...a11yProps(subTabIndex)}
                                            />
                                        ))}
                                    </Box>
                                </>
                            )}
                        </Box>
                    );
                })}
            </Tabs>
            {children.map((child, index) => {
                const isCurrentTab = selectedSectionIndex * 2 + selectedTabIndex === index;
                return (
                    <TabPanel key={index} value={isCurrentTab ? index : -1} index={index}>
                        {child}
                    </TabPanel>
                );
            })}
        </Box>
    );
};

export default VerticalTabs;
