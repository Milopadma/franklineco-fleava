// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/fonts", "@nuxtjs/tailwindcss", "nuxt-swiper"],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  plugins: [
    "~/plugins/locomotive-scroll.client.js",
    "~/plugins/gsap.client.js",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
