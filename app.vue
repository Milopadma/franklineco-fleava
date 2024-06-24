<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import CursorFollower from '~/components/cursorfollower.vue'

// Import Swiper styles
import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
    CursorFollower
  },
  data() {
    return {
      scroll: null,
    }
  },
  beforeDestroy() {
    this.scroll.destroy()
  },
  methods: {
    locomotiveScrollInit() {
      this.scroll = new this.$LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        getDirection: true
      });

      // log scroll instance for debugging
      console.log("LocomotiveScroll instance:", this.scroll);
    },
    showCursorFollower() {
      const cursorFollower = document.querySelector('.cursor-follower');
      cursorFollower.textContent = 'Drag Me';
      this.$gsap.to(cursorFollower, {
        width: '4rem',
        height: '4rem',
        top: '-33px',
        left: '-33px',
        outline: '1px solid grey',
        outlineOffset: '10px',
        duration: 0.5,
        ease: 'elastic.out'
      });
    },
    hideCursorFollower() {
      const cursorFollower = document.querySelector('.cursor-follower');
      cursorFollower.textContent = '';
      this.$gsap.to(cursorFollower, {
        width: '3.3rem',
        height: '3.3rem',
        top: '-25px',
        left: '-25px',
        outline: 'none',
        outlineOffset: '0',
        duration: 0.5,
        ease: 'power2.out'
      });
    },

    scrollAnimation() {
      const chairText1 = document.querySelector('#chair-text-1');
      const chairCharacters1 = chairText1.textContent.split('');
      chairText1.innerHTML = chairCharacters1.map(char => `<span class="chair-char-1">${char}</span>`).join('');

      const chairText2 = document.querySelector('#chair-text-2');
      const chairCharacters2 = chairText2.textContent.split('');
      chairText2.innerHTML = chairCharacters2.map(char => `<span class="chair-char-2">${char}</span>`).join('');

      const chairText3 = document.querySelector('#chair-text-3');
      const chairCharacters3 = chairText3.textContent.split('');
      chairText3.innerHTML = chairCharacters3.map(char => `<span class="chair-char-3">${char}</span>`).join('');

      const chairText4 = document.querySelector('#chair-text-4');
      const chairCharacters4 = chairText4.textContent.split('');
      chairText4.innerHTML = chairCharacters4.map(char => `<span class="chair-char-4">${char}</span>`).join('');

      const imageText1 = document.querySelector('#image-text-1');
      const imageCharacters1 = imageText1.textContent.split('');
      imageText1.innerHTML = imageCharacters1.map(char => `<span class="image-char-1">${char}</span>`).join('');

      const imageText2 = document.querySelector('#image-text-2');
      const imageCharacters2 = imageText2.textContent.split('');
      imageText2.innerHTML = imageCharacters2.map(char => `<span class="image-char-2">${char}</span>`).join('');

      const footerText = document.querySelector('#footer-text');
      const footerCharacters = footerText.textContent.split('');
      footerText.innerHTML = footerCharacters.map(char => `<span class="footer-char">${char}</span>`).join('');

      const footerText2 = document.querySelector('#footer-text-2');
      const footerCharacters2 = footerText2.textContent.split('');
      footerText2.innerHTML = footerCharacters2.map(char => `<span class="footer-char-2">${char}</span>`).join('');

      this.scroll.on('call', (value, way, obj) => {
        console.log("scroll event:", value, way, obj);
        if (value === 'itemAnimation') {
          if (way === 'enter') {
            this.$gsap.from(obj.el, {
              opacity: 0,
              y: 60,
              duration: 2,
              ease: 'expo.inOut',
            });
          }
        }
      });

      this.scroll.on('call', (value, way, obj) => {
        if (value === 'textStaggerAnimation' && way === 'enter') {
          const textElements = obj.el.querySelectorAll('.chair-char-1');
          this.$gsap.from(textElements, {
            opacity: 0,
            translateY: 10,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.05
          });
        }
      });

      this.scroll.on('call', (value, way, obj) => {
        if (value === 'textStaggerAnimation2' && way === 'enter') {
          const textElements = obj.el.querySelectorAll('.chair-char-4');
          this.$gsap.from(textElements, {
            opacity: 0,
            translateY: 10,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.005
          });
        }
      });
      this.scroll.on('call', (value, way, obj) => {
        if (value === 'textStaggerAnimation2' && way === 'enter') {
          const textElements = obj.el.querySelectorAll('.chair-char-3');
          this.$gsap.from(textElements, {
            opacity: 0,
            translateY: 10,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.005
          });
        }
      });

      this.scroll.on('call', (value, way, obj) => {
        if (value === 'textStaggerAnimation' && way === 'enter') {
          const textElements = obj.el.querySelectorAll('.chair-char-2');
          this.$gsap.from(textElements, {
            opacity: 0,
            translateY: 10,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.005
          });
        }
      });

      this.scroll.on('call', (value, way, obj) => {
        if (value === 'swiperSlideAnimation' && way === 'enter') {
          const swiperSlides = obj.el.querySelectorAll('.swiper-slide');
          this.$gsap.from(swiperSlides, {
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.3
          });
        }
      });

      this.scroll.on('call', (value, way, obj) => {
        if (value === 'textStaggerAnimation' && way === 'enter') {
          const textElements = obj.el.querySelectorAll('.new-text-stagger');
          this.$gsap.from(textElements, {
            opacity: 0,
            translateY: 10,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.005
          });
        }
      });

      this.scroll.on('call', (value, way, obj) => {
        if (value === 'textStaggerAnimation' && way === 'enter') {
          const textElements = obj.el.querySelectorAll('.image-char-1');
          this.$gsap.from(textElements, {
            opacity: 0,
            translateY: 10,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.005
          });
        }
      });

      this.scroll.on('call', (value, way, obj) => {
        if (value === 'textStaggerAnimation' && way === 'enter') {
          const textElements = obj.el.querySelectorAll('.image-char-2');
          this.$gsap.from(textElements, {
            opacity: 0,
            translateY: 10,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.005
          });
        }
      });

      this.scroll.on('call', (value, way, obj) => {
        if (value === 'textStaggerAnimation' && way === 'enter') {
          const textElements = obj.el.querySelectorAll('.footer-char');
          this.$gsap.from(textElements, {
            opacity: 0,
            translateY: 10,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.005
          });
        }
      });

      this.scroll.on('call', (value, way, obj) => {
        if (value === 'textStaggerAnimation' && way === 'enter') {
          const textElements = obj.el.querySelectorAll('.footer-char-2');
          this.$gsap.from(textElements, {
            opacity: 0,
            translateY: 10,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.005
          });
        }
      });
    },

    onLoadAnimation() {
      const headerText = document.querySelector('#header');
      const characters = headerText.textContent.split('');
      headerText.innerHTML = characters.map(char => `<span class="char">${char}</span>`).join('');

      const headerAnimation = this.$gsap.from('.char', {
        opacity: 0,
        y: 50, // slide in from bottom
        duration: 2,
        ease: 'power2.out',
        stagger: 0.05
      });

      const navElements = document.querySelectorAll('#nav-logo, #nav-links, #nav-menu');
      const navAnimations = [];
      navElements.forEach((element, index) => {
        const animation = this.$gsap.from(element, {
          opacity: 0,
          y: 50, // slide in from bottom
          duration: 1.5,
          ease: 'power2.out',
          delay: 1 + index * 0.3 // add 1 second delay from anim start
        });
        navAnimations.push(animation);
      });

      const chairImageAnimation = this.$gsap.from('#chair-image', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power2.out',
        delay: 1
      });


      // restart all animations on mouse click for debugging purposes
      window.addEventListener('click', () => {
        console.log("restarting animations for debugging purposes");
        headerAnimation.restart();
        navAnimations.forEach(animation => animation.restart());
        chairImageAnimation.restart();
      });
    }
  },
  mounted() {
    this.locomotiveScrollInit();
    this.onLoadAnimation();
    this.scrollAnimation();
  },
};
</script>
<template>
  <CursorFollower />
  <div data-scroll-container class="overflow-x-hidden">
    <div data-scroll class="mx-[60px] grid grid-cols-9 gap-[30px]">
      <spacing :size64="true" class="col-span-9" />
      <nav class="col-span-9 flex justify-between font-[530] tracking-[-0.01em]">
        <div id="nav-logo">Frankliné&Co.</div>
        <div id="nav-links" class="min-w-[35vw]">Products, Solutions, Stories </div>
        <div id="nav-menu">Menu</div>
      </nav>
      <header class="col-span-9 pt-[calc(10vw)]">
        <h1 id="header"
          class="text-[calc(13vw-1em)] leading-[calc(10vw)] tracking-[calc(-0.2vw-0.01em)] font-[530] whitespace-nowrap text-center">
          Maréchal Verchetti
        </h1>
      </header>
      <section class="col-span-9 flex flex-col">
        <div class="flex items-center flex-col justify-center">
          <img src="/chair.jpg" alt="chair" id="chair-image" />
        </div>
      </section>
      <section class="col-span-7 col-start-3 flex flex-col">
        <div class="w-full flex flex-col justify-end items-end">
          <div class="flex flex-col justify-end pt-[calc(4vw)]">
            <p class="text-[calc(4.8vw)] leading-[calc(4.8vw)] tracking-[-0.01em] font-[530] text-left pb-4"
              id="chair-text" data-scroll data-scroll-call="itemAnimation" data-block-item>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maréchal Verchetti is built on a
              legacy
              of creative partnership. In a first-of-its-kind
              collaboration, the
              Frankliné Jeremy design house thought fully reimagines eight ●
            </p>
            <div class="border-t-2 border-gray-300 pt-16"></div>
            <div class="flex flex-row justify-between pt-8">
              <p id="chair-text-1"
                class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-medium text-left max-w-[calc(24vw)]"
                data-scroll data-scroll-call="textStaggerAnimation">
                /THESE CHAIRS CAN BE
              </p>
              <p id="chair-text-2"
                class="text-[calc(1.5vw)] leading-[calc(2vw)] tracking-[-0.01vw] font-[200] text-left max-w-[calc(35vw)]"
                data-scroll data-scroll-call="textStaggerAnimation">
                These chairs can be upholstered in just about any fabric you like. When
                upholstered, the chair&rsquo;s back and seat have exposed veneer on the
                back sides. Veneers are available in six wood.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="pt-44">
      <section class="w-full flex justify-center items-center cursor-grab" @mouseenter="showCursorFollower"
        @mouseleave="hideCursorFollower" data-scroll data-scroll-call="swiperSlideAnimation">
        <swiper :slides-per-view="3" :space-between="38" :slides-offset-before="60" @swiper="onSwiper"
          @slideChange="onSlideChange" draggable="true">
          <swiper-slide>
            <img src="/eameschair.jpg" alt="chair">
            <p class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left uppercase pt-9">
              Eames Moulded Plastic Side Chair</p>
          </swiper-slide>
          <swiper-slide>
            <img src="/eamessofa.jpg" alt="chair">
            <p class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left uppercase pt-9">
              Eames Sofa Compact</p>
          </swiper-slide>
          <swiper-slide>
            <img src="/eameslight.jpg" alt="chair">
            <p class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left uppercase pt-9">
              Eames Moulded Plastic Armchair</p>
          </swiper-slide>
          <swiper-slide>
            <img src="/eamessofa.jpg" alt="chair">
            <p class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left uppercase pt-9">
              Eames Sofa Compact</p>
          </swiper-slide>
          <swiper-slide>
            <img src="/eameslight.jpg" alt="chair">
            <p class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left uppercase pt-9">
              Eames Moulded Plastic Armchair</p>
          </swiper-slide>
        </swiper>
      </section>
    </div>
    <div class="mx-[60px] grid grid-cols-9 gap-[30px]">
      <section class="col-span-9 flex flex-col">
        <div class="w-full flex flex-col justify-start items-start">
          <div class="flex flex-col justify-end pt-[calc(4vw)] max-w-[calc(88vw)]">
            <h2
              class="text-[calc(25vw)] leading-[calc(25vw)] tracking-[-0.01em] font-[530] text-left whitespace-nowrap -translate-x-96"
              data-scroll data-scroll-repeat data-scroll-speed="48" data-scroll-direction="horizontal">
              Fine forms, — Refined.
              Fine forms, — Refined.
            </h2>
            <div class="flex flex-row justify-between pt-16">
              <p class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left max-w-[calc(24vw)]"
                id="chair-text-3" data-scroll data-scroll-call="textStaggerAnimation2">
                /THESE CHAIRS CAN BE
              </p>
              <p class="text-[calc(1.5vw)] leading-[calc(2vw)] tracking-[-0.01vw] font-[200] text-left max-w-[calc(25vw)] mr-[calc(5vw)] new-text-stagger"
                id="chair-text-4" data-scroll data-scroll-call="textStaggerAnimation2">
                Fresh eyes see new possibilities for classic Eames designs, including a bold new colour palette and
                updated materials.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="grid grid-cols-9 pt-[calc(10vw)]">
      <div class="relative col-span-9 grid grid-cols-9">
        <img src="/threechairs.jpg" alt="three chairs" class="w-full col-span-9" data-scroll-speed="2">
        <div class="text-[#C8BEB4] col-span-6 col-start-4 absolute mr-[calc(10vw-1em)] mt-[clamp(2vw,25%,10vw)]">
          <p class="text-[calc(3.5vw)] leading-[calc(3.8vw)] tracking-[-0.01em] font-[530]" id="image-text-1"
            data-scroll data-scroll-call="textStaggerAnimation" data-scroll-speed="2">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maréchal Verchetti is built on a
            legacy of creative partnership. In a first-of-its-kind collaboration, the
            Frankliné Jeremy design house thought fully reimagines eight ●
          </p>
        </div>
        <div class="absolute bottom-16 right-16 text-[#C8BEB4]">
          <p class="text-[calc(1.5vw)] leading-[calc(2vw)] tracking-[-0.01em] font-[300] max-w-[calc(16vw)]"
            id="image-text-2" data-scroll data-scroll-call="textStaggerAnimation" data-scroll-speed="1">
            Fresh eyes see new possibilities for classic Eames designs, including a bold new colour palette and
            updated
            materials.
          </p>
        </div>
      </div>
    </section>
    <section class="grid grid-cols-9 pt-[calc(10vw)] mx-[60px]">
      <p class="text-[calc(5vw)] leading-[calc(5vw)] tracking-[-0.01em] font-[530] col-start-1 col-span-7"
        id="footer-text" data-scroll data-scroll-call="textStaggerAnimation">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Herman
        Miller is
        built on a legacy of
        creative partnership. In a first-of-its-kind collaboration, the Danish
        design house HAY</p>
      <div class="relative pt-[calc(10vw)] col-start-1 col-span-9">
        <img src="/graychairs.jpg" alt="gray chairs" id="gray-chairs-image" data-scroll data-scroll-speed="2">
        <img src="/graychair.jpg" alt="gray chair" class="absolute bottom-[calc(5vw)] left-[calc(5vw)] w-3/12"
          id="gray-chair-image" data-scroll data-scroll-speed="1">
      </div>
      <footer class="col-span-9 col-start-1">
        <h1
          class="text-[calc(12vw-1em)] leading-[calc(12vw)] tracking-[calc(-0.4vw-0.01em)] font-[530] whitespace-nowrap text-center text-[#333333] py-16"
          id="footer-text-2" data-scroll data-scroll-call="textStaggerAnimation" data-scroll-speed="1">
          Another Collective</h1>
      </footer>
    </section>
  </div>
</template>
