<template>
  <SpeedInsights />
  <div>
    <nav
      id="main-nav"
      class="col-span-9 grid grid-cols-9 font-[530] tracking-[-0.01em] relative bg-[hsla(0,0%,100%,0.4)] z-50 backdrop-blur-md pt-16 pb-4 mx-[60px]"
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

<script>
import { gsap } from "gsap";
import CursorFollower from "~/components/cursorfollower.vue";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import SmoothScroll from "~/components/smoothscroll.vue";
import DebugToggle from "~/components/debugtoggle.vue";
import { store } from "~/store";

export default {
  components: {
    CursorFollower,
    SpeedInsights,
    SmoothScroll,
    DebugToggle,
  },
  setup() {
    return { store };
  },
  data() {
    return {
      selectedLink: null,
    };
  },
  mounted() {
    this.checkCurrentUrl();
  },
  watch: {
    $route() {
      this.checkCurrentUrl();
      this.animateLinks();
    },
  },
  methods: {
    changeCursorToImage() {
      if (this.$refs.cursorFollower) {
        this.$refs.cursorFollower.changeCursorToImage();
      } else {
        console.log("cursorFollower ref is not defined");
      }
    },
    resetCursor() {
      if (this.$refs.cursorFollower) {
        this.$refs.cursorFollower.resetCursor();
      } else {
        console.log("cursorFollower ref is not defined");
      }
    },

    locomotiveScrollInit() {
      store.scroll = new this.$LocomotiveScroll({
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
      console.log("LocomotiveScroll initialized:", store.scroll);
      this.animateScroll();
    },

    animateLinks() {
      gsap.killTweensOf(document.querySelectorAll("#nav-links-text"));
      const linkTexts = document.querySelectorAll("#nav-links-text");
      gsap.to(linkTexts, { opacity: 1, duration: 0 });
      linkTexts.forEach((linkText) => {
        if (this.selectedLink === "") {
          gsap.to(linkText, { opacity: 1, duration: 0.5 });
        } else if (
          linkText.textContent.trim().toLowerCase() !== this.selectedLink
        ) {
          gsap.to(linkText, { opacity: 0.2, duration: 0.5 });
        } else {
          gsap.to(linkText, { opacity: 1, duration: 0.5 });
        }
      });

      // animate circle fading in when it exists
      const circles = document.querySelectorAll(".circle");
      gsap.fromTo(circles, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    },
    animateScroll() {
      store.scroll.on("scroll", (args) => {
        const navElements = document.querySelectorAll("#main-nav");
        if (args.scroll.y > 30) {
          this.$gsap.to(navElements, {
            translateY: "-50%",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            duration: 0.3,
            ease: "circ.out",
          }); // add padding to nav elements
        } else {
          this.$gsap.to(navElements, {
            translateY: "0%",
            paddingLeft: "0",
            paddingRight: "0",
            duration: 0.3,
            ease: "circ.out",
          }); // remove padding from nav elements
        }
      });
    },
    checkCurrentUrl() {
      const path = window.location.pathname;
      if (path.includes("products")) {
        this.selectedLink = "products,";
        this.animateLinks();
      } else if (path.includes("solutions")) {
        this.selectedLink = "solutions,";
        this.animateLinks();
      } else if (path.includes("stories")) {
        this.selectedLink = "stories";
        this.animateLinks();
      } else if (path.includes("")) {
        this.selectedLink = "";
        this.animateLinks();
      } else {
        this.selectedLink = null;
      }
    },
  },
};
</script>

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
