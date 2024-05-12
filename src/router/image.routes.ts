export default [
    {
        path: "/image/generation",
        name: "image-generation",
        component: () =>
            import(
                /* webpackChunkName: "image-generation" */ "@/views/generateImage/index.vue"
            ),
        meta: {
            requiresAuth: true,
            layout: "landing",
        },
    },
    {
        path: "/image/favorate",
        name: "image-favorate",
        component: () =>
            import(
                /* webpackChunkName: "image-generation" */ "@/views/favorateList/index.vue"
            ),
        meta: {
            requiresAuth: true,
            layout: "landing",
        },
    },
    {
        path: "/image/society",
        name: "image-society",
        component: () =>
            import(
                /* webpackChunkName: "image-generation" */ "@/views/societyList/index.vue"
            ),
        meta: {
            requiresAuth: true,
            layout: "landing",
        },
    }
]