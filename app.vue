<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log("swiper instance:", swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
};
</script>
<template>
  <div>
    <div class="mx-[60px] grid grid-cols-9 gap-[30px]">
      <spacing :size64="true" class="col-span-9" />
      <nav class="col-span-9 flex justify-between font-[530] tracking-[-0.01em]">
        <div>Frankliné&Co.</div>
        <div class="min-w-[35vw]">Products, Solutions, Stories </div>
        <div>Menu</div>
      </nav>
      <header class="col-span-9 pt-[calc(10vw)]">
        <h1
          class="text-[calc(13vw-1em)] leading-[calc(10vw)] tracking-[calc(-0.2vw-0.01em)] font-[530] whitespace-nowrap text-center">
          Maréchal Verchetti
        </h1>
      </header>
      <section class="col-span-9 flex flex-col">
        <div class="flex items-center flex-col justify-center">
          <img src="/chair.jpg" alt="chair" />
        </div>
      </section>
      <section class="col-span-7 col-start-3 flex flex-col">
        <div class="w-full flex flex-col justify-end items-end">
          <div class="flex flex-col justify-end pt-[calc(4vw)]">
            <p class="text-[calc(4.8vw)] leading-[calc(4.8vw)] tracking-[-0.01em] font-[530] text-left pb-4">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maréchal Verchetti is built on a
              legacy
              of creative partnership. In a first-of-its-kind
              collaboration, the
              Frankliné Jeremy design house thought fully reimagines eight ●
            </p>
            <div class="border-t-2 border-gray-300 pt-16"></div>
            <div class="flex flex-row justify-between pt-8">
              <p
                class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-medium text-left max-w-[calc(24vw)]">
                /THESE CHAIRS CAN BE
              </p>
              <p
                class="text-[calc(1.5vw)] leading-[calc(2vw)] tracking-[-0.01vw] font-[200] text-left max-w-[calc(35vw)]">
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
      <section class="w-full flex justify-center items-center cursor-grab">
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
              class="text-[calc(25vw)] leading-[calc(25vw)] tracking-[-0.01em] font-[530] text-left whitespace-nowrap">
              Fine forms, — Refined.
            </h2>
            <div class="flex flex-row justify-between pt-2">
              <p
                class="text-[calc(1vw)] leading-[calc(1vw)] tracking-[-0.02em] font-[400] text-left max-w-[calc(24vw)]">
                /THESE CHAIRS CAN BE
              </p>
              <p
                class="text-[calc(1.5vw)] leading-[calc(2vw)] tracking-[-0.01vw] font-[200] text-left max-w-[calc(35vw)]">
                Fresh eyes see new possibilities for classic Eames designs, including a bold new colour palette and
                updated materials.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="col-span-9 flex flex-col pt-[calc(10vw)]">
        <div class="relative">
          <img src="/threechairs.jpg" alt="three chairs" class="w-full">
          <div class="absolute top-10 right-10 p-4 text-[#C8BEB4]">
            <p class="text-[calc(3vw)] leading-[calc(3vw)] tracking-[-0.01em] font-[600] max-w-[calc(43vw)]">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maréchal Verchetti is built on a
              legacy of creative partnership. In a first-of-its-kind collaboration, the
              Frankliné Jeremy design house thought fully reimagines eight ●
            </p>
          </div>
          <div class="absolute bottom-10 right-10 p-4 text-[#C8BEB4]">
            <p class="text-[calc(1vw)] leading-[calc(1.5vw)] tracking-[-0.01em] font-[400] mt-4 max-w-[calc(12vw)]">
              Fresh eyes see new possibilities for classic Eames designs, including a bold new colour palette and
              updated
              materials.
            </p>
          </div>
        </div>
      </section>
      <section class="col-span-9 flex flex-col pt-[calc(10vw)]">
        <p class="text-[calc(4vw)] leading-[calc(4vw)] tracking-[-0.01em] font-[600] mt-4 max-w-[calc(54vw)]">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Herman Miller is built on a legacy of
          creative partnership. In a first-of-its-kind collaboration, the Danish
          design house HAY</p>
        <div class="relative pt-[calc(10vw)]">
          <img src="/graychairs.jpg" alt="gray chairs">
          <img src="/graychair.jpg" alt="gray chair" class="absolute bottom-10 left-10">
        </div>
      </section>
      <footer class="col-span-9">
        <h1
          class="text-[calc(11vw)] leading-[calc(10vw+10vh)] tracking-[-0.02em] font-[600] whitespace-nowrap text-center">
          Another Collective</h1>
      </footer>
    </div>
  </div>
</template>
