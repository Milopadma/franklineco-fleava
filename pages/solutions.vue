<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import CursorFollower from "~/components/cursorfollower.vue";
import SmoothScroll from "~/components/smoothscroll.vue";

// Import Swiper styles
import "swiper/css";

export default {
  components: {
    Swiper,
    SwiperSlide,
    CursorFollower,
    SmoothScroll,
  },
  data() {
    return {
      scroll: null,
    };
  },
  beforeDestroy() {
    if (this.scroll) {
      this.scroll.destroy();
      this.scroll = null;
    }
  },
  methods: {
    initCheckImagesLoaded() {
      this.$imagesloaded(
        document.querySelectorAll("[data-scroll-container]"),
        () => {
          console.log("Images loaded");
          this.scroll.update();
        }
      );
    },
    locomotiveScrollInit() {
      this.scroll = new this.$LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        getDirection: true,
        mobile: {
          smooth: true,
          getDirection: true,
        },
        tablet: {
          smooth: true,
          getDirection: true,
          breakpoint: 0,
        },
      });

      // log scroll instance for debugging
      console.log("LocomotiveScroll instance:", this.scroll);
    },
    showCursorFollower() {
      const cursorFollower = document.querySelector(".cursor-follower");
      cursorFollower.textContent = "Drag Me";
      this.$gsap.to(cursorFollower, {
        width: "4rem",
        height: "4rem",
        top: "-33px",
        left: "-33px",
        outline: "1px solid grey",
        outlineOffset: "10px",
        duration: 0.5,
        ease: "elastic.out",
      });
    },
    hideCursorFollower() {
      const cursorFollower = document.querySelector(".cursor-follower");
      cursorFollower.textContent = "";
      this.$gsap.to(cursorFollower, {
        width: "3.3rem",
        height: "3.3rem",
        top: "-25px",
        left: "-25px",
        outline: "none",
        outlineOffset: "0",
        duration: 0.5,
        ease: "power2.out",
      });
    },

    scrollAnimation() { },

    onLoadAnimation() {
      this.$gsap.from("#header", {
        y: 240, // slide in from bottom
        duration: 2,
        ease: "expo",
        stagger: 0.05,
      });
      this.$gsap.from("#subheader", {
        opacity: 0,
        duration: 2,
        ease: "power1.in",
        stagger: 0.05,
      });
      this.$gsap.from("#headerNumber", {
        y: 120, // slide in from bottom
        duration: 2,
        ease: "expo",
        delay: 0.5,
      });
      this.$gsap.from("#supportText1", {
        y: 120, // slide in from bottom
        duration: 2,
        ease: "expo",
        delay: 0.5,
      });
      this.$gsap.from("#supportText2", {
        y: 120, // slide in from bottom
        duration: 2,
        ease: "expo",
        delay: 0.8,
      });
      this.$gsap.from("#supportText3", {
        y: 120, // slide in from bottom
        duration: 2,
        ease: "expo",
        delay: 1,
      });

      this.$gsap.from("#line-1", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power2.out",
        delay: 1.5,
      });

      this.$gsap.from("#line-2", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power2.out",
        delay: 1.8,
      });

      this.$gsap.from("#line-3", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power2.out",
        delay: 2,
      });

      this.$gsap.from("#line-4", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power2.out",
        delay: 2.2,
      });

      this.$gsap.from("#line-5", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power2.out",
        delay: 2.4,
      });

      // set gsap ticker settings
      this.$gsap.ticker.lagSmoothing(1000, 16);
      this.$gsap.ticker.fps(120);
    },
    optionHover(option) {
      let refOption1 = this.$refs[option];
      let refOption1Child = refOption1.children[0];
      console.log(refOption1)
      this.$gsap.to("#image", {
        opacity: 1,
        translateY: 0,
        duration: 0.2,
        ease: "power2.out",
      });
      this.$gsap.to(refOption1, {
        backgroundColor: "black",
        color: "white",
        duration: 0.5,
        ease: "power2.out",
      });
      this.$gsap.to(refOption1Child, {
        paddingLeft: "2rem",
        duration: 0.5,
        ease: "power2.out",
      });
      this.$gsap.to(refOption1Child.children[4], {
        paddingRight: "2rem",
        duration: 0.5,
        ease: "power2.out",
      });
    },
    optionHoverLeave(option) {
      let refOption1 = this.$refs[option];
      this.$gsap.to("#image", {
        opacity: 0,
        translateY: 10,
        duration: 0.2,
        ease: "power2.out",
      });
      this.$gsap.to(refOption1, {
        backgroundColor: "white",
        color: "black",
        duration: 0.5,
        ease: "power2.out",
      });
      this.$gsap.to(refOption1.children[0], {
        paddingLeft: "0",
        duration: 0.5,
        ease: "power2.out",
      });
      this.$gsap.to(refOption1.children[0].children[4], {
        paddingRight: "0",
        duration: 0.5,
        ease: "power2.out",
      });
    },
  },
  mounted() {
    this.locomotiveScrollInit();
    this.initCheckImagesLoaded();
    this.onLoadAnimation();
    this.scrollAnimation();
    // re-initialize LocomotiveScroll on page reload
    window.addEventListener("beforeunload", () => {
      if (this.scroll) {
        this.scroll.destroy();
        this.scroll = null;
      }
    });
  },
};
</script>

<template>
  <SpeedInsights />
  <CursorFollower ref="cursorFollower" />
  <SmoothScroll>
    <div class="overflow-x-hidden">
      <div data-scroll class="mx-[60px] grid grid-cols-9 gap-[30px]">
        <header class="col-span-9 pt-[calc(10vw)] overflow-clip">
          <h1 id="header"
            class="text-[calc(13vw-1em)] leading-[calc(10vw)] tracking-[calc(-0.2vw-0.01em)] font-[530] whitespace-nowrap text-center cursor-default">
Solutions
          </h1>
          <div class="border-b-2 border-b-black pt-4" id="line-1"></div>
          <div id="subheader" class="w-full justify-between flex flex-row pt-2">
            <p class="capitalize">aliquam mi maecenas</p>
            <p class="capitalize">Egestas odio</p>
            <p class="capitalize">aliquam maecenas</p>
            <p class="capitalize">odio rhoncus</p>
          </div>
        </header>
        <section class="col-span-3 col-start-1 flex flex-col pt-12 overflow-clip">
          <div class="flex flex-col overflow-clip h-[calc(60%)]">
            <p class="text-[calc(6.5vw)] leading-[calc(5.2vw)] tracking-[-0.01em] font-[530] text-left pb-4 cursor-default"
              id="headerNumber">
              23
            </p>
          </div>
        </section>
        <section class="col-span-2 col-start-4 opacity-0 translate-y-10 flex justify-center items-center" id="image">
          <img src="/chair.jpg" alt="">
        </section>
        <section class="col-span-4 col-start-6 flex flex-col">
          <div class="w-full flex flex-col justify-end items-end">
            <div class="flex flex-col justify-end pt-12">
              <p
                class="text-[calc(2.5vw)] leading-[calc(2.5vw)] tracking-[-0.01em] font-[530] text-left pb-4 cursor-default overflow-clip">
              <div class="overflow-clip">
                <p id="supportText1">
                  Designers Frankliné Jeremy
                </p>
              </div>
              <div class="overflow-clip">
                <p id="supportText2">
                  established their long and legendary
                </p>
              </div>
              <div class="overflow-clip">
                <p id="supportText3">
                  relationship with Maréchal Verchetti
                </p>
              </div>
              </p>
            </div>
          </div>
        </section>
      </div>
      <section class="col-span-9 col-start-1 mx-[60px] pt-24 pb-24">
        <div ref="option-1" @mouseover="optionHover(`option-1`)" @mouseleave="optionHoverLeave(`option-1`)">
          <div class="grid grid-cols-9 gap-[30px] pt-4">
            <p class="col-start-1 col-span-1">001</p>
            <p class="col-start-2 col-span-2">Egestas odio rhoncus</p>
            <p class="col-start-4 col-span-2">Tempor Nam Ut</p>
            <p class="col-start-6 col-span-1">023</p>
            <p class="col-start-9 col-span-1 text-right">023</p>
          </div>
          <div class="border-b-2 border-b-black pt-4" id="line-2"></div>
        </div>
        <div ref="option-2" @mouseover="optionHover(`option-2`)" @mouseleave="optionHoverLeave(`option-2`)">
          <div class="grid grid-cols-9 gap-[30px] pt-4">
            <p class="col-start-1 col-span-1">001</p>
            <p class="col-start-2 col-span-2">Egestas odio rhoncus</p>
            <p class="col-start-4 col-span-2">Tempor Nam Ut</p>
            <p class="col-start-6 col-span-1">023</p>
            <p class="col-start-9 col-span-1 text-right">023</p>
          </div>
          <div class="border-b-2 border-b-black pt-4" id="line-3"></div>
        </div>
        <div ref="option-3" @mouseover="optionHover(`option-3`)" @mouseleave="optionHoverLeave(`option-3`)">
          <div class="grid grid-cols-9 gap-[30px] pt-4">
            <p class="col-start-1 col-span-1">001</p>
            <p class="col-start-2 col-span-2">Egestas odio rhoncus</p>
            <p class="col-start-4 col-span-2">Tempor Nam Ut</p>
            <p class="col-start-6 col-span-1">023</p>
            <p class="col-start-9 col-span-1 text-right">023</p>
          </div>
          <div class="border-b-2 border-b-black pt-4" id="line-4"></div>
        </div>
        <div ref="option-4" @mouseover="optionHover(`option-4`)" @mouseleave="optionHoverLeave(`option-4`)">
          <div class="grid grid-cols-9 gap-[30px] pt-4">
            <p class="col-start-1 col-span-1">001</p>
            <p class="col-start-2 col-span-2">Egestas odio rhoncus</p>
            <p class="col-start-4 col-span-2">Tempor Nam Ut</p>
            <p class="col-start-6 col-span-1">023</p>
            <p class="col-start-9 col-span-1 text-right">023</p>
          </div>
          <div class="border-b-2 border-b-black pt-4" id="line-5"></div>
        </div>
      </section>
    </div>
  </SmoothScroll>
</template>
