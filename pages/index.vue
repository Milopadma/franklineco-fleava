<script setup lang="ts">
// import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import CursorFollower from "../components/cursorfollower.vue";
import { store } from "../store";

// import Swiper styles
import "swiper/css";

import { gsap } from "gsap";
import imagesLoaded from "imagesloaded";
import { onMounted, onBeforeUnmount } from "vue";

// initialize images loaded check
const initCheckImagesLoaded = () => {
  imagesLoaded(document.querySelectorAll("[data-scroll-container]"), () => {
    // log images loaded
    store.scroll.update();
  });
};

// show cursor follower
const showCursorFollower = () => {
  const cursorFollower = document.querySelector(".cursor-follower");
  if (cursorFollower) {
    cursorFollower.textContent = "Drag Me";
    gsap.to(cursorFollower, {
      width: "4rem",
      height: "4rem",
      top: "-33px",
      left: "-33px",
      outline: "1px solid grey",
      outlineOffset: "10px",
      duration: 0.5,
      ease: "elastic.out",
    });
  }
};

// hide cursor follower
const hideCursorFollower = () => {
  const cursorFollower = document.querySelector(".cursor-follower");
  if (cursorFollower) {
    cursorFollower.textContent = "";
    gsap.to(cursorFollower, {
      width: "3.3rem",
      height: "3.3rem",
      top: "-25px",
      left: "-25px",
      outline: "none",
      outlineOffset: "0",
      duration: 0.5,
      ease: "power2.out",
    });
  }
};

let scrollAnimationCleanup: (() => void) | null = null;

const initScrollAnimation = () => {
  const elements = [
    { selector: "#chair-text-1", className: "chair-char-1" },
    { selector: "#chair-text-2", className: "chair-char-2" },
    { selector: "#chair-text-3", className: "chair-char-3" },
    { selector: "#chair-text-4", className: "chair-char-4" },
    { selector: "#image-text-1", className: "image-char-1" },
    { selector: "#image-text-2", className: "image-char-2" },
    { selector: "#footer-text", className: "footer-char" },
    { selector: "#footer-text-2", className: "footer-text-2" },
  ];

  elements.forEach(({ selector, className }) => {
    const element = document.querySelector(selector);
    if (element && element.textContent) {
      const characters = element.textContent.match(/.{1,6}/g);
      if (characters) {
        element.innerHTML = characters
          .map((char) => `<span class="${className}">${char}</span>`)
          .join("");
      }
    }
  });

  const animations = [
    {
      value: "itemAnimation",
      selector: ".chair-text",
      way: "enter",
      animation: { opacity: 0, y: 60, duration: 2, ease: "expo.inOut" },
    },
    {
      value: "textStaggerAnimation",
      way: "enter",
      selector: ".chair-char-1",
      animation: {
        opacity: 0,
        translateY: 10,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.05,
      },
    },
    {
      value: "textStaggerAnimation2",
      way: "enter",
      selector: ".chair-char-4",
      animation: {
        opacity: 0,
        translateY: 10,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.005,
      },
    },
    {
      value: "textStaggerAnimation2",
      way: "enter",
      selector: ".chair-char-3",
      animation: {
        opacity: 0,
        translateY: 10,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.005,
      },
    },
    {
      value: "textStaggerAnimation",
      way: "enter",
      selector: ".chair-char-2",
      animation: {
        opacity: 0,
        translateY: 10,
        duration: 5,
        ease: "power2.out",
        stagger: 0.05,
      },
    },
    {
      value: "swiperSlideAnimation",
      way: "enter",
      selector: ".swiper-slide",
      animation: {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.3,
      },
    },
    {
      value: "textStaggerAnimation",
      way: "enter",
      selector: ".new-text-stagger",
      animation: {
        opacity: 0,
        translateY: 10,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.005,
      },
    },
    {
      value: "textStaggerAnimation",
      way: "enter",
      selector: ".image-char-1",
      animation: {
        opacity: 0,
        translateY: 10,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.005,
      },
    },
    {
      value: "textStaggerAnimation",
      way: "enter",
      selector: ".image-char-2",
      animation: {
        opacity: 0,
        translateY: 10,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.005,
      },
    },
    {
      value: "textStaggerAnimation",
      way: "enter",
      selector: ".footer-char",
      animation: {
        opacity: 0,
        translateY: 10,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.005,
      },
    },
    {
      value: "footerTextAnimation",
      way: "enter",
      selector: ".footer-text-2",
      animation: {
        opacity: 0,
        translateY: 100,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.005,
      },
    },
  ];

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const cleanupFunctions: (() => void)[] = [];

  animations.forEach(({ value, way, selector, animation }) => {
    const handler = debounce((callValue: any, callWay: any, obj: any) => {
      if (callValue === value && callWay === way) {
        const elements = obj.el.querySelectorAll(selector);
        if (elements.length > 0) {
          gsap.from(elements, animation);
        }
      }
    }, 16);

    store.scroll.on("call", handler);
    cleanupFunctions.push(() => store.scroll.off("call", handler));
  });

  scrollAnimationCleanup = () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
};

// on load animation
const onLoadAnimation = () => {
  const headerText = document.querySelector("#header");
  if (headerText && headerText.textContent) {
    const characters = headerText.textContent.split("");
    headerText.innerHTML = characters
      .map((char) => `<span class="char">${char}</span>`)
      .join("");

    gsap.from(".char", {
      opacity: 0,
      y: 50, // slide in from bottom
      duration: 2,
      ease: "power2.out",
      stagger: 0.05,
    });

    const navElements = document.querySelectorAll(
      "#nav-logo, #nav-links, #nav-menu"
    );
    const navAnimations: gsap.core.Tween[] = [];
    navElements.forEach((element, index) => {
      const animation = gsap.from(element, {
        opacity: 0,
        y: 50, // slide in from bottom
        duration: 1.5,
        ease: "power2.out",
        delay: 1 + index * 0.3, // add 1 second delay from anim start
      });
      navAnimations.push(animation);
    });

    gsap.from("#chair-image", {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power2.out",
      delay: 1,
    });

    gsap.from("#chair-text", {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power2.out",
      delay: 1.8,
    });

    // set gsap ticker settings
    gsap.ticker.lagSmoothing(1000, 16);
    gsap.ticker.fps(120);
  }
};

// call methods on mount
onMounted(() => {
  initCheckImagesLoaded();
  onLoadAnimation();
  initScrollAnimation();
});

onBeforeUnmount(() => {
  if (scrollAnimationCleanup) {
    scrollAnimationCleanup();
  }
});
</script>

<template>
  <div class="mx-[60px] grid grid-cols-9 gap-[30px]">
    <header class="col-span-9 pt-[calc(10vw)]">
      <h1
        id="header"
        class="text-[calc(13vw-1em)] leading-[calc(10vw)] tracking-[calc(-0.2vw-0.01em)] font-[530] whitespace-nowrap text-center cursor-default"
      >
        Maréchal Verchetti
      </h1>
    </header>
    <section class="col-span-9 flex flex-col">
      <div
        class="flex items-center flex-col justify-center max-h-[calc(80vw)] overflow-clip"
      >
        <img
          src="/chair.jpg"
          alt="chair"
          id="chair-image"
          placeholder=""
          data-scroll
          data-scroll-speed="-1"
        />
      </div>
    </section>
    <section class="col-span-7 col-start-3 flex flex-col">
      <div class="w-full flex flex-col justify-end items-end">
        <div class="flex flex-col justify-end pt-[calc(4vw)]">
          <p
            class="text-[calc(4.8vw)] leading-[calc(4.8vw)] tracking-[-0.01em] font-[530] text-left pb-4 cursor-default"
            id="chair-text"
            data-scroll
            data-scroll-call="itemAnimation"
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maréchal
            Verchetti is built on a legacy of creative partnership. In a
            first-of-its-kind collaboration, the Frankliné Jeremy design house
            thought fully reimagines eight ●
          </p>
          <div class="border-t-2 border-gray-300 pt-16"></div>
          <div class="flex flex-row justify-between pt-8">
            <p
              id="chair-text-1"
              class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-medium text-left max-w-[calc(24vw)] cursor-default"
              data-scroll
              data-scroll-call="textStaggerAnimation"
            >
              /THESE CHAIRS CAN BE
            </p>
            <p
              id="chair-text-2"
              class="text-[calc(1.5vw)] leading-[calc(2vw)] tracking-[-0.01vw] font-[200] text-left max-w-[calc(35vw)] cursor-default"
              data-scroll
              data-scroll-call="textStaggerAnimation"
            >
              These chairs can be upholstered in just about any fabric you like.
              When upholstered, the chair&rsquo;s back and seat have exposed
              veneer on the back sides. Veneers are available in six wood.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="pt-44">
    <ClientOnly>
      <section
        class="w-full cursor-grab"
        data-scroll
        data-scroll-call="swiperSlideAnimation"
        @mouseenter="showCursorFollower"
        @mouseleave="hideCursorFollower"
      >
        <Swiper
          :slides-per-view="3"
          :space-between="38"
          :slides-offset-before="60"
          draggable="true"
        >
          <SwiperSlide>
            <img src="/eameschair.jpg" alt="chair" />
            <p
              class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left uppercase pt-9"
            >
              Eames Moulded Plastic Side Chair
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/eamessofa.jpg" alt="chair" />
            <p
              class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left uppercase pt-9"
            >
              Eames Sofa Compact
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/eameslight.jpg" alt="chair" />
            <p
              class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left uppercase pt-9"
            >
              Eames Moulded Plastic Armchair
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/eamessofa.jpg" alt="chair" />
            <p
              class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left uppercase pt-9"
            >
              Eames Sofa Compact
            </p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/eameslight.jpg" alt="chair" />
            <p
              class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left uppercase pt-9"
            >
              Eames Moulded Plastic Armchair
            </p>
          </SwiperSlide>
        </Swiper>
      </section>
    </ClientOnly>
  </div>
  <div class="mx-[60px] grid grid-cols-9 gap-[30px]">
    <section class="col-span-9 flex flex-col">
      <div class="w-full flex flex-col justify-start items-start">
        <div
          class="flex flex-col justify-end pt-[calc(4vw)] max-w-[calc(88vw)]"
        >
          <h2
            class="text-[calc(25vw)] leading-[calc(25vw)] tracking-[-0.01em] font-[530] text-left whitespace-nowrap -translate-x-96 cursor-default"
            data-scroll
            data-scroll-repeat
            data-scroll-speed="48"
            data-scroll-direction="horizontal"
          >
            Fine forms, — Refined. Fine forms, — Refined.
          </h2>
          <div class="flex flex-row justify-between pt-16">
            <p
              class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left max-w-[calc(24vw)] cursor-default"
              id="chair-text-3"
              data-scroll
              data-scroll-call="textStaggerAnimation2"
            >
              /THESE CHAIRS CAN BE
            </p>
            <p
              class="text-[calc(1.5vw)] leading-[calc(2vw)] tracking-[-0.01vw] font-[200] text-left max-w-[calc(25vw)] mr-[calc(5vw)] new-text-stagger cursor-default"
              id="chair-text-4"
              data-scroll
              data-scroll-call="textStaggerAnimation2"
            >
              Fresh eyes see new possibilities for classic Eames designs,
              including a bold new colour palette and updated materials.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <section class="grid grid-cols-9 pt-[calc(10vw)]">
    <div
      class="relative col-span-9 grid grid-cols-9 overflow-clip max-h-[calc(100vw)]"
    >
      <img
        src="/threechairs.jpg"
        alt="three chairs"
        class="w-full col-span-9"
        loading="lazy"
        data-scroll
        data-scroll-speed="-1"
      />
      <div
        class="text-[#C8BEB4] col-span-6 col-start-4 absolute mr-[calc(10vw-1em)] mt-[clamp(2vw,25%,10vw)]"
      >
        <p
          class="text-[calc(3.5vw)] leading-[calc(3.8vw)] tracking-[-0.01em] font-[530] cursor-default"
          id="image-text-1"
          data-scroll
          data-scroll-call="textStaggerAnimation"
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maréchal
          Verchetti is built on a legacy of creative partnership. In a
          first-of-its-kind collaboration, the Frankliné Jeremy design house
          thought fully reimagines eight ●
        </p>
      </div>
      <div class="absolute bottom-16 right-16 text-[#C8BEB4]">
        <p
          class="text-[calc(1.5vw)] leading-[calc(2vw)] tracking-[-0.01em] font-[300] max-w-[calc(16vw)] cursor-default"
          id="image-text-2"
          data-scroll
          data-scroll-call="textStaggerAnimation"
        >
          Fresh eyes see new possibilities for classic Eames designs, including
          a bold new colour palette and updated materials.
        </p>
      </div>
    </div>
  </section>
  <section class="grid grid-cols-9 pt-[calc(10vw)] mx-[60px]">
    <p
      class="text-[calc(5vw)] leading-[calc(5vw)] tracking-[-0.01em] font-[530] col-start-1 col-span-7 cursor-default"
      id="footer-text"
      data-scroll
      data-scroll-call="textStaggerAnimation"
    >
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Herman
      Miller is built on a legacy of creative partnership. In a
      first-of-its-kind collaboration, the Danish design house HAY
    </p>
    <div class="relative pt-[calc(10vw)] col-start-1 col-span-9">
      <div
        class="overflow-clip max-h-[calc(50vw)] flex justify-center items-center"
      >
        <img
          src="/graychairs.jpg"
          alt="gray chairs"
          id="gray-chairs-image"
          data-scroll
          data-scroll-speed="-1"
          loading="lazy"
        />
      </div>
      <div
        class="absolute bottom-[calc(5vw)] left-[calc(5vw)] w-3/12"
        data-scroll
        data-scroll-speed="-2"
      >
        <img
          src="/graychair.jpg"
          alt="gray chair"
          class="w-full"
          id="gray-chair-image"
        />
      </div>
    </div>
    <footer class="col-span-9 col-start-1 pb-16">
      <h1
        class="text-[calc(12vw-1em)] leading-[calc(12vw)] tracking-[calc(-0.4vw-0.01em)] font-[530] whitespace-nowrap text-center text-[#333333] py-16 cursor-default"
        id="footer-text-2"
        data-scroll
        data-scroll-call="footerTextAnimation"
      >
        Another Collective
      </h1>
    </footer>
  </section>
</template>
