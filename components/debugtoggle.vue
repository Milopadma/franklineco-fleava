<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
    console.log("debug toggle ready");
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    handleKeydown(event) {
      if (event.shiftKey && event.key === "G") {
        this.toggleDebugOutline();
      }
    },
    toggleDebugOutline() {
      const elements = document.querySelectorAll(
        "*:not(#nuxt-devtools-anchor *)"
      );
      elements.forEach((element) => {
        if (element.classList.contains("debug-outline")) {
          element.classList.remove("debug-outline");
        } else {
          element.classList.add("debug-outline");
        }
      });
    },
  },
};
</script>

<style scoped></style>
