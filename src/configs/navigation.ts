
import menuLanding from "./menus/landing.menu";
import menuUI from "./menus/ui.menu";
import menuPages from "./menus/pages.menu";
import menuImage from "./menus/image.menu";

export default {
    menu: [
        {
            text: "",
            items: [
                {

                text: "仪表盘",
                link: "/dashboard",
                icon: "mdi-view-dashboard-outline",
                },
            ],
        },
        {
            text: "Image",
            items: menuImage,
        },
        {
            text: "Landing",
            items: [
                ...menuLanding,
            ],
        },
        {
            text: "UI - Theme Preview",
            items: menuUI,
        },
        {
            text: "Pages",
            items: menuPages,
        },

    ],
};
