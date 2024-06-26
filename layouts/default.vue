<template>
  <div class="data-scroll">
    <!-- <spacing :size64="true" class="col-span-9" /> -->
    <nav
      id="main-nav"
      class="col-span-9 flex justify-between font-[530] tracking-[-0.01em] relative bg-[hsla(0,0%,100%,0.5)] z-50 backdrop-blur-md pt-16 pb-6"
    >
      <NuxtLink to="/" id="nav-logo" class="cursor-pointer ml-[60px]"
        >Frankliné&Co.</NuxtLink
      >
      <div class="min-w-[35vw] flex flex-row">
        <NuxtLink to="/products" id="nav-links" class="cursor-default">
          Products, &nbsp;
        </NuxtLink>
        <NuxtLink to="/solutions" id="nav-links" class="cursor-default">
          Solutions, &nbsp;
        </NuxtLink>
        <NuxtLink
          to="/stories"
          id="nav-links"
          class="cursor-pointer"
          @mouseover="changeCursorToImage"
          @mouseleave="resetCursor"
          >Stories</NuxtLink
        >
      </div>
      <div id="nav-menu" class="cursor-default mr-[60px]">Menu</div>
    </nav>
    <slot />
    <CursorFollower ref="cursorFollower" />
  </div>
</template>

<script>
import CursorFollower from "~/components/cursorfollower.vue";

export default {
  components: {
    CursorFollower,
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
  },
};
</script>

<style scoped>
#main-nav {
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
}
</style>
