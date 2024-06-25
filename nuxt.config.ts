// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss",
    "nuxt-swiper",
    "@hypernym/nuxt-gsap",
  ],
  pages: true,
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  plugins: [
    "~/plugins/locomotive-scroll.client.ts",
    "~/plugins/imagesloaded.client.ts",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
