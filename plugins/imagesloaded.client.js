import imagesloaded from "imagesloaded";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("imagesloaded", imagesloaded);
});
