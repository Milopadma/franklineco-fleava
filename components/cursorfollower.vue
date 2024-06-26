<template>
  <div class="cursor-follower"></div>
</template>

<script>
export default {
  mounted() {
    this.setCursorAnimation();
  },

  methods: {
    setCursorAnimation() {
      /**
       * Mouse Follower (GSAP3)
       * code by Blake Bowen
       * @link https://codepen.io/osublake/pen/dce29f9c14192035dbf55a32181f0bdc
       */
      const gsap = this.$gsap;
      const cursorFollower = document.querySelector(".cursor-follower");
      const pos = { x: window.innerWidth, y: window.innerHeight };
      const mouse = { x: pos.x, y: pos.y };
      const speed = 0.13;
      const fpms = 60 / 1000;

      const xSet = gsap.quickSetter(cursorFollower, "x", "px");
      const ySet = gsap.quickSetter(cursorFollower, "y", "px");

      window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;

        gsap.set(".cursor-follower", {
          opacity: 1,
          duration: 2,
          ease: "expo.out",
        });
      });

      gsap.ticker.add((time, deltaTime) => {
        const delta = deltaTime * fpms;
        const dt = 1.0 - Math.pow(1.0 - speed, delta);

        const prevX = pos.x;
        const prevY = pos.y;

        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;

        const deltaX = pos.x - prevX;
        const deltaY = pos.y - prevY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
          const limitedAngle = Math.max(Math.min(angle, 15), -15); // limit the angle to max 15 degrees

          gsap.to(".cursor-follower", {
            rotation: limitedAngle,
            duration: 0.2,
            ease: "sine.out",
          }); // add animation to the roll
        }

        xSet(pos.x);
        ySet(pos.y);
      });
    },
    changeCursorToImage() {
      const cursorFollower = document.querySelector(".cursor-follower");
      //   this.$gsap.to(cursorFollower, {
      //     backgroundImage: "url(/eameschair.jpg)",
      //     backgroundSize: "cover",
      //     borderRadius: "0%",
      //     width: "10rem",
      //     height: "10rem",
      //     mixBlendMode: "normal",
      //     duration: 0.2,
      //     ease: "sine.out",
      //   });
    },
    resetCursor() {
      const cursorFollower = document.querySelector(".cursor-follower");
      //   this.$gsap.to(cursorFollower, {
      //     backgroundImage: "none",
      //     borderRadius: "50%",
      //     width: "3.3rem",
      //     height: "3.3rem",
      //     mixBlendMode: "difference",
      //     duration: 0.5,
      //     ease: "power2.out",
      //   });
    },
  },
};
</script>

<style scoped>
.cursor-follower {
  z-index: 1000;
  position: fixed;
  width: 3.3rem;
  height: 3.3rem;
  top: -25px;
  left: -25px;
  background-color: gray;
  border-radius: 50%;
  opacity: 0;
  mix-blend-mode: difference;
  pointer-events: none;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1rem;
  letter-spacing: -0.01rem;
  font-weight: 200;
  color: white;
}
</style>
