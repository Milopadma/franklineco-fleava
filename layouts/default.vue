<template>
  <div class="data-scroll">
    <!-- <spacing :size64="true" class="col-span-9" /> -->
    <nav
      id="main-nav"
      class="col-span-9 flex justify-between font-[530] tracking-[-0.01em] relative bg-[hsla(0,0%,100%,0.4)] z-50 backdrop-blur-md pt-16 pb-4"
    >
      <NuxtLink to="/" id="nav-logo" class="cursor-pointer ml-[60px]"
        >Frankliné&Co.</NuxtLink
      >
      <div class="min-w-[35vw] flex flex-row">
        <NuxtLink
          to="/products"
          id="nav-links"
          class="cursor-pointer relative"
          @click="animateLinks"
        >
          <span v-if="selectedLink === 'products'" class="circle"></span>
          Products, &nbsp;
        </NuxtLink>
        <NuxtLink
          to="/solutions"
          id="nav-links"
          class="cursor-pointer relative"
          @click="animateLinks"
        >
          <span v-if="selectedLink === 'solutions'" class="circle"></span>
          Solutions, &nbsp;
        </NuxtLink>
        <NuxtLink
          to="/stories"
          id="nav-links"
          class="cursor-pointer relative"
          @mouseover="changeCursorToImage"
          @mouseleave="resetCursor"
          @click="animateLinks"
        >
          <span v-if="selectedLink === 'stories'" class="circle"></span>
          Stories
        </NuxtLink>
      </div>
      <div id="nav-menu" class="cursor-default mr-[60px]">Menu</div>
    </nav>
    <slot />
    <CursorFollower ref="cursorFollower" />
  </div>
</template>

<script>
import { gsap } from "gsap";
import CursorFollower from "~/components/cursorfollower.vue";

export default {
  components: {
    CursorFollower,
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
    animateLinks(event) {
      const links = document.querySelectorAll("#nav-links");
      // reset opacity for all links
      gsap.to(links, { opacity: 1, duration: 0 });
      links.forEach((link) => {
        if (event && link !== event.target) {
          gsap.to(link, { opacity: 0.2, duration: 0.5 });
        } else if (
          !event &&
          link.textContent.trim().toLowerCase() === this.selectedLink
        ) {
          gsap.to(link, { opacity: 1, duration: 0.5 });
        }
      });

      // animate circle fading in when it exists
      const circles = document.querySelectorAll(".circle");
      gsap.fromTo(circles, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    },
    checkCurrentUrl() {
      const path = window.location.pathname;
      if (path.includes("products")) {
        this.selectedLink = "products";
      } else if (path.includes("solutions")) {
        this.selectedLink = "solutions";
      } else if (path.includes("stories")) {
        this.selectedLink = "stories";
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
