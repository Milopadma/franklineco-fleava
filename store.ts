import { reactive } from "vue";

export const store = reactive({
  scroll: import("locomotive-scroll").then(
    (locomotiveScroll) =>
      new locomotiveScroll.default({
        el: document.querySelector("[data-scroll-container]") as HTMLElement,
        smooth: true,
        getDirection: true,
        tablet: {
          smooth: true,
          breakpoint: 0,
        },
      })
  ),
});
