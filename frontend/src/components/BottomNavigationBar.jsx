import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const bottomNavTheme = createTheme({
    palette: {
        primary: {
            main: "#FED634",
        },
    },
    typography: {
        fontFamily: [
            "Noto Sans Thai",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
});

export default function LabelBottomNavigation() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState("/");
    const routes = ["/", "/restaurant", "/random"];

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(newValue);
    };

    return (
        <ThemeProvider theme={bottomNavTheme}>
            <BottomNavigation
                className="bottom-0 fixed max-w-screen w-full overflow-hidden z-0"
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction
                    label="หน้าแรก"
                    value={routes[0]}
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    label="ร้านอาหาร"
                    value={routes[1]}
                    icon={<StoreIcon />}
                />
                <BottomNavigationAction
                    label="สุ่มเมนู"
                    value={routes[2]}
                    icon={<MenuBookIcon />}
                />
            </BottomNavigation>
        </ThemeProvider>
    );
}
