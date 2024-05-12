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
    }
]