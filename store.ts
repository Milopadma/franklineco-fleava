import { reactive } from "vue";

let scrollInstance: any = null;

import("locomotive-scroll").then((locomotiveScroll) => {
  scrollInstance = new locomotiveScroll.default({
    el: document.querySelector("[data-scroll-container]") as HTMLElement,
    smooth: true,
    getDirection: true,
    tablet: {
      smooth: true,
      breakpoint: 0,
    },
  });
});

export const store = reactive({
  get scroll() {
    console.log("scroll", scrollInstance);
    return scrollInstance;
  },
});
