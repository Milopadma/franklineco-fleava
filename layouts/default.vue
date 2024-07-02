<script setup lang="ts">
import { gsap } from "gsap";
import CursorFollower from "../components/cursorfollower.vue";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import SmoothScroll from "../components/smoothscroll.vue";
import DebugToggle from "../components/debugtoggle.vue";
import { store } from "../store";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const selectedLink = ref<string | null>(null);
const route = useRoute();

const changeCursorToImage = () => {
  const cursorFollower = ref<InstanceType<typeof CursorFollower> | null>(null);
  if (cursorFollower.value) {
    cursorFollower.value.changeCursorToImage();
  } else {
    console.log("cursorFollower ref is not defined");
  }
};

const initResizeObserver = () => {
  // Add ResizeObserver to update scroll on resize
  new ResizeObserver(() => store.scroll.update()).observe(
    document.querySelector("[data-scroll-container]") as Element
  );
};

const resetCursor = () => {
  const cursorFollower = ref<InstanceType<typeof CursorFollower> | null>(null);
  if (cursorFollower.value) {
    cursorFollower.value.resetCursor();
  } else {
    console.log("cursorFollower ref is not defined");
  }
};

const animateLinks = () => {
  gsap.killTweensOf(document.querySelectorAll("#nav-links-text"));
  const linkTexts = document.querySelectorAll("#nav-links-text");
  gsap.to(linkTexts, { opacity: 1, duration: 0 });
  linkTexts.forEach((linkText) => {
    if (selectedLink.value === "") {
      gsap.to(linkText, { opacity: 1, duration: 0.5 });
    } else if (
      linkText.textContent?.trim().toLowerCase() !== selectedLink.value
    ) {
      gsap.to(linkText, { opacity: 0.2, duration: 0.5 });
    } else {
      gsap.to(linkText, { opacity: 1, duration: 0.5 });
    }
  });

  // animate circle fading in when it exists
  const circles = document.querySelectorAll(".circle");
  gsap.fromTo(circles, { opacity: 0 }, { opacity: 1, duration: 0.5 });
};

const animateScroll = () => {
  store.scroll.on("scroll", (args: any) => {
    const navElements = document.querySelectorAll("#main-nav");
    if (args.scroll.y > 30) {
      gsap.to(navElements, {
        translateY: "-50%",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        duration: 0.3,
        ease: "circ.out",
      }); // add padding to nav elements
    } else {
      gsap.to(navElements, {
        translateY: "0%",
        paddingLeft: "60px",
        paddingRight: "60px",
        duration: 0.3,
        ease: "circ.out",
      }); // remove padding from nav elements
    }
  });
};

const checkCurrentUrl = () => {
  const path = window.location.pathname;
  if (path.includes("products")) {
    selectedLink.value = "products,";
    animateLinks();
  } else if (path.includes("solutions")) {
    selectedLink.value = "solutions,";
    animateLinks();
  } else if (path.includes("stories")) {
    selectedLink.value = "stories";
    animateLinks();
  } else if (path.includes("")) {
    selectedLink.value = "";
    animateLinks();
  } else {
    selectedLink.value = null;
  }
};

onMounted(() => {
  checkCurrentUrl();
  initResizeObserver();
  animateScroll();
});

watch(route, () => {
  checkCurrentUrl();
  animateLinks();
});
</script>

<template>
  <div>
    <SpeedInsights />
    <nav
      id="main-nav"
      class="col-span-9 grid grid-cols-9 font-[530] tracking-[-0.01em] relative bg-[hsla(0,0%,100%,0.4)] z-50 backdrop-blur-md pt-16 pb-4 px-[60px]"
    >
      <NuxtLink to="/" id="nav-logo" class="cursor-pointer col-span-1"
        >Frankliné&Co.</NuxtLink
      >
      <div class="col-span-3 col-start-4">
        <NuxtLink
          to="/products"
          id="nav-links"
          class="cursor-pointer relative"
          @click="animateLinks"
        >
          <span v-if="selectedLink === 'products,'" class="circle mr-1"></span>
          <span id="nav-links-text">Products,</span><span>&nbsp;</span>
        </NuxtLink>
        <NuxtLink
          to="/solutions"
          id="nav-links"
          class="cursor-pointer relative"
          @click="animateLinks"
        >
          <span v-if="selectedLink === 'solutions,'" class="circle mr-1"></span>
          <span id="nav-links-text">Solutions,</span><span>&nbsp;</span>
        </NuxtLink>
        <NuxtLink
          to="/stories"
          id="nav-links"
          class="cursor-pointer relative"
          @mouseover="changeCursorToImage"
          @mouseleave="resetCursor"
          @click="animateLinks"
        >
          <span v-if="selectedLink === 'stories'" class="circle mr-1"></span>
          <span id="nav-links-text">Stories</span>
        </NuxtLink>
      </div>
      <div
        id="nav-menu"
        class="cursor-default col-start-9 col-span-1 text-right"
      >
        Menu
      </div>
    </nav>
    <SmoothScroll>
      <slot />
    </SmoothScroll>
    <CursorFollower ref="cursorFollower" />
    <DebugToggle />
  </div>
</template>

<style scoped>
.circle {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: black;
  border-radius: 50%;
  margin-left: 4px;
}
</style>
