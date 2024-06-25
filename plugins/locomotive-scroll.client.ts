import LocomotiveScroll from "locomotive-scroll";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("LocomotiveScroll", LocomotiveScroll);
});
