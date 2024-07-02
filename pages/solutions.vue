<script setup lang="ts">
import imagesloaded from "imagesloaded";
import { store } from "../store";
import { gsap } from "gsap";

const optionClicked = ref<string | null>(null);
const hoveredImage = ref<string>("");

function initCheckImagesLoaded() {
  imagesloaded(document.querySelectorAll("[data-scroll-container]"), () => {
    store.scroll.update();
    onLoadAnimation();
  });
}

function onLoadAnimation() {
  gsap.from("#header", {
    y: 240, // slide in from bottom
    duration: 2,
    ease: "expo",
    stagger: 0.05,
  });
  gsap.from("#subheader", {
    opacity: 0,
    duration: 2,
    ease: "power1.in",
    stagger: 0.05,
  });
  gsap.from("#headerNumber", {
    y: 170, // slide in from bottom
    duration: 2,
    ease: "expo",
    delay: 0.5,
  });
  gsap.from("#supportText1", {
    y: 120, // slide in from bottom
    duration: 2,
    ease: "expo",
    delay: 0.5,
  });
  gsap.from("#supportText2", {
    y: 120, // slide in from bottom
    duration: 2,
    ease: "expo",
    delay: 0.8,
  });
  gsap.from("#supportText3", {
    y: 120, // slide in from bottom
    duration: 2,
    ease: "expo",
    delay: 1,
  });

  gsap.from("#line-1", {
    scaleX: 0,
    transformOrigin: "left",
    duration: 1.5,
    ease: "power2.out",
    delay: 1.5,
  });

  gsap.from("#line-2", {
    scaleX: 0,
    transformOrigin: "left",
    duration: 1.5,
    ease: "power2.out",
    delay: 1.8,
  });

  gsap.from("#line-3", {
    scaleX: 0,
    transformOrigin: "left",
    duration: 1.5,
    ease: "power2.out",
    delay: 2,
  });

  gsap.from("#line-4", {
    scaleX: 0,
    transformOrigin: "left",
    duration: 1.5,
    ease: "power2.out",
    delay: 2.2,
  });

  gsap.from("#line-5", {
    scaleX: 0,
    transformOrigin: "left",
    duration: 1.5,
    ease: "power2.out",
    delay: 2.4,
  });

  gsap.from(["#option-1", "#option-2", "#option-3", "#option-4"], {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    delay: 2,
  });

  // set gsap ticker settings
  gsap.ticker.lagSmoothing(1000, 16);
  gsap.ticker.fps(120);
}

function optionHover(option: string, imageUrl: string) {
  const refOption = document.getElementById(option);
  const refOptionChild = refOption?.children[0] as HTMLElement | null;

  if (optionClicked.value !== option) {
    hoveredImage.value = imageUrl; // set the image URL
    gsap.to("#subheader-image", {
      opacity: 1,
      translateY: 0,
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(refOption, {
      backgroundColor: "black",
      color: "white",
      duration: 0.5,
      ease: "power2.out",
    });
    if (refOptionChild) {
      gsap.to(refOptionChild, {
        paddingLeft: "2rem",
        duration: 0.5,
        ease: "power2.out",
      });
      const childElement = refOptionChild.children[4] as HTMLElement;
      gsap.to(childElement, {
        paddingRight: "2rem",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }
}

function optionHoverLeave(option: string) {
  const refOption = document.getElementById(option);

  if (optionClicked.value !== option) {
    gsap.to("#subheader-image", {
      opacity: 0,
      translateY: 10,
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(refOption, {
      backgroundColor: "white",
      color: "black",
      duration: 0.5,
      ease: "power2.out",
    });
    const optionChild = refOption?.children[0] as HTMLElement;
    gsap.to(optionChild, {
      paddingLeft: "0",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(optionChild.children[4] as HTMLElement, {
      paddingRight: "0",
      duration: 0.5,
      ease: "power2.out",
    });
  }
}

function optionClick(option: string) {
  optionClicked.value = optionClicked.value === option ? null : option;
  const bigImageSection = document.querySelector(
    "#bigImageSection"
  ) as HTMLElement;
  const subHeaderElements = [
    "#subheader-number",
    "#subheader-image",
    "#subheader-subtext",
  ];
  gsap.killTweensOf(bigImageSection);
  gsap.killTweensOf(subHeaderElements);

  // untoggle other options to trigger the hoverLeave animation
  ["option-1", "option-2", "option-3", "option-4"].forEach((key) => {
    if (key !== option) {
      optionHoverLeave(key);
    }
  });

  if (optionClicked.value === null) {
    // hide content
    const showSubHeaderTimeline = gsap.timeline();
    store.scroll.update();
    // this.scroll.scrollTo("#header", { offset: -200, duration: 1000 });
    showSubHeaderTimeline
      .to(subHeaderElements, {
        clipPath: "inset(0% 0% 0% 0%)",
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(bigImageSection, {
        clipPath: "inset(0% 0% 100% 0%)",
        opacity: 0,
        height: 0,
        duration: 0.5,
        ease: "power2",
        onComplete: () => {
          bigImageSection.style.display = "none";
        },
      });

    const refOption1 = document.getElementById(option) as HTMLElement;
    gsap.to("#subheader-image", {
      opacity: 0,
      translateY: 10,
      duration: 0.2,
      ease: "power2.out",
    });
    gsap.to(refOption1, {
      backgroundColor: "white",
      color: "black",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(refOption1.children[0] as HTMLElement, {
      paddingLeft: "0",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(refOption1.children[0].children[4] as HTMLElement, {
      paddingRight: "0",
      duration: 0.5,
      ease: "power2.out",
    });
  } else {
    // show content
    const refOption = document.getElementById(option) as HTMLElement;
    const refOptionChild = refOption.children[0] as HTMLElement;
    gsap.to(refOption, {
      backgroundColor: "black",
      color: "white",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(refOptionChild, {
      paddingLeft: "2rem",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(refOptionChild.children[4] as HTMLElement, {
      paddingRight: "2rem",
      duration: 0.5,
      ease: "power2.out",
    });

    const hideSubHeaderTimeline = gsap.timeline();
    // const refOption = this.$refs["option-1"];
    bigImageSection.style.display = "block";
    store.scroll.update();
    // this.scroll.scrollTo(refOption, { offset: -322, duration: 1000 });
    hideSubHeaderTimeline
      .to(subHeaderElements, {
        clipPath: "inset(0% 0% 100% 0%)",
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(bigImageSection, {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        height: "auto",
      });
  }
}

onMounted(() => {
  initCheckImagesLoaded();
  // re-initialize LocomotiveScroll on page reload
  window.addEventListener("beforeunload", () => {
    if ((this as any).scroll) {
      (this as any).scroll.destroy();
      (this as any).scroll = null;
    }
  });
});
</script>

<template>
  <div class="overflow-x-hidden pt-[calc(10vh)] min-h-[120vh]">
    <div class="mx-[60px] grid grid-cols-9 gap-[30px]">
      <header class="col-span-9 overflow-clip">
        <h1
          id="header"
          class="text-[calc(13vw-1em)] leading-[calc(10vw)] tracking-[calc(-0.2vw-0.01em)] font-[530] whitespace-nowrap text-center cursor-default"
        >
          Solutions
        </h1>
        <div class="border-b-2 border-b-black pt-4" id="line-1"></div>
        <div id="subheader" class="w-full grid grid-cols-9 pt-2 gap-[30px]">
          <p class="col-span-3 capitalize">aliquam mi maecenas</p>
          <p class="col-span-2 capitalize">Egestas odio</p>
          <p class="col-span-3 capitalize">aliquam maecenas</p>
          <p class="col-span-1 text-right capitalize">odio rhoncus</p>
        </div>
      </header>
      <section
        id="subheader-number"
        class="col-span-2 col-start-1 flex flex-col overflow-clip"
      >
        <div class="flex flex-col overflow-clip">
          <p
            class="tracking-[-0.01em] font-[530] text-left pb-4 cursor-default"
            id="headerNumber"
            style="
              font-size: calc(
                24px + (189 - 24) * ((100vw - 320px) / (1280 - 320))
              );
              line-height: calc(
                24px + (140 - 24) * ((100vw - 320px) / (1280 - 320))
              );
            "
          >
            23
          </p>
        </div>
      </section>
      <section
        id="subheader-image"
        class="col-span-3 col-start-3 md:col-span-2 md:col-start-4 translate-y-10 flex justify-start object-cover opacity-0"
      >
        <img
          :src="hoveredImage"
          alt=""
          class="object-cover w-[200px] h-[200px]"
        />
      </section>
      <section
        id="subheader-subtext"
        class="col-span-4 col-start-6 flex flex-col"
      >
        <div
          class="w-full flex flex-col"
          style="
            font-size: calc(
              24px + (36 - 24) * ((100vw - 320px) / (1280 - 320))
            );
            line-height: calc(
              24px + (36 - 24) * ((100vw - 320px) / (1280 - 320))
            );
          "
        >
          <div class="flex flex-col justify-end">
            <div
              class="tracking-[-0.01em] font-[530] text-left cursor-default overflow-clip"
            >
              <p id="supportText1">Designers Frankliné Jeremy</p>
            </div>
            <div
              class="tracking-[-0.01em] font-[530] text-left cursor-default overflow-clip"
            >
              <p id="supportText2">established their long and legendary</p>
            </div>
            <div
              class="tracking-[-0.01em] font-[530] text-left cursor-default overflow-clip"
            >
              <p id="supportText3">relationship with Maréchal Verchetti</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section
      :class="[
        'col-span-9 col-start-1 mx-[60px]',
        optionClicked ? 'pt-0 pb-2' : 'pt-12',
      ]"
    >
      <div
        id="option-1"
        @mouseover="optionHover('option-1', '/chair.jpg')"
        @mouseleave="optionHoverLeave('option-1')"
        @click="optionClick('option-1')"
      >
        <div class="grid grid-cols-9 gap-[30px] pt-4">
          <p class="col-start-1 col-span-1">001</p>
          <p class="col-start-2 col-span-2">Innovative Design Concepts</p>
          <p class="col-start-4 col-span-2">Revolutionary Ideas</p>
          <p class="col-start-6 col-span-1">023</p>
          <p class="col-start-8 col-span-2 text-right">023</p>
        </div>
        <div class="border-b-2 border-b-black pt-4" id="line-2"></div>
      </div>
      <div
        id="option-2"
        @mouseover="optionHover('option-2', '/eameschair.jpg')"
        @mouseleave="optionHoverLeave('option-2')"
        @click="optionClick('option-2')"
      >
        <div class="grid grid-cols-9 gap-[30px] pt-4">
          <p class="col-start-1 col-span-1">002</p>
          <p class="col-start-2 col-span-2">Cutting-Edge Solutions</p>
          <p class="col-start-4 col-span-2">Future-Forward Thinking</p>
          <p class="col-start-6 col-span-1">023</p>
          <p class="col-start-8 col-span-2 text-right">023</p>
        </div>
        <div class="border-b-2 border-b-black pt-4" id="line-3"></div>
      </div>
      <div
        id="option-3"
        @mouseover="optionHover('option-3', '/eameslight.jpg')"
        @mouseleave="optionHoverLeave('option-3')"
        @click="optionClick('option-3')"
      >
        <div class="grid grid-cols-9 gap-[30px] pt-4">
          <p class="col-start-1 col-span-1">003</p>
          <p class="col-start-2 col-span-2">Pioneering Innovations</p>
          <p class="col-start-4 col-span-2">Trailblazing Concepts</p>
          <p class="col-start-6 col-span-1">023</p>
          <p class="col-start-8 col-span-2 text-right">023</p>
        </div>
        <div class="border-b-2 border-b-black pt-4" id="line-4"></div>
      </div>
      <div
        id="option-4"
        @mouseover="optionHover('option-4', '/graychairs.jpg')"
        @mouseleave="optionHoverLeave('option-4')"
        @click="optionClick('option-4')"
      >
        <div class="grid grid-cols-9 gap-[30px] pt-4">
          <p class="col-start-1 col-span-1">004</p>
          <p class="col-start-2 col-span-2">Visionary Creations</p>
          <p class="col-start-4 col-span-2">Groundbreaking Designs</p>
          <p class="col-start-6 col-span-1">023</p>
          <p class="col-start-8 col-span-2 text-right">023</p>
        </div>
        <div class="border-b-2 border-b-black pt-4" id="line-5"></div>
      </div>
    </section>
    <section
      id="bigImageSection"
      class="bg-[#151611] overflow-clip hidden opacity-0"
    >
      <div class="overflow-clip">
        <img
          src="/public/bigchair.jpg"
          alt=""
          data-scroll
          data-scroll-speed="-1"
          class="object-cover object-center h-[calc(50vh)] w-full"
        />
      </div>
      <section class="mx-[60px] grid grid-cols-9 gap-[30px] py-24">
        <section
          class="col-span-3 col-start-1 flex flex-col pt-12 overflow-clip text-white"
        >
          <div class="flex flex-col overflow-clip h-[calc(60%)]">
            <p
              class="text-[calc(10vw)] leading-[calc(7vw)] tracking-[-0.01em] font-[530] text-left pb-4 cursor-default"
              id="headerNumber"
            >
              23
            </p>
          </div>
        </section>
        <section class="col-span-4 col-start-6 flex flex-col">
          <div class="w-full flex flex-col justify-end items-end">
            <div class="flex flex-col justify-end pt-12">
              <div
                class="text-[calc(3.2vw)] leading-[calc(3.2vw)] tracking-[-0.01em] font-[530] text-left cursor-default overflow-clip text-white"
              >
                <div>Designers Frankliné Jeremy</div>
              </div>
              <div
                class="text-[calc(3.2vw)] leading-[calc(3.2vw)] tracking-[-0.01em] font-[530] text-left cursor-default overflow-clip text-white"
              >
                <div>established their long and</div>
              </div>
              <div
                class="text-[calc(3.2vw)] leading-[calc(3.2vw)] tracking-[-0.01em] font-[530] text-left cursor-default overflow-clip text-white"
              >
                <div>
                  legendary relationship with
                  <span class="text-[#C1A986]">Maréchal Verchetti</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          class="col-span-9 grid grid-cols-9 gap-[30px] text-white pt-16 pb-24"
        >
          <div
            class="col-span-3 col-start-1 md:col-span-2 md:col-start-4 flex flex-col md:flex-row gap-[30px]"
          >
            <p>1945</p>
            <ul>
              <li>The Birth of Modern Design</li>
              <li>Eames Moulded Plywood Revolution</li>
              <li>Innovative Materials and Techniques</li>
              <li>Breaking Traditional Boundaries</li>
              <li>Charles and Ray Eames' Vision</li>
            </ul>
          </div>
          <div
            class="col-span-3 col-start-4 md:col-span-2 md:col-start-6 flex flex-col md:flex-row gap-[30px]"
          >
            <p>1946</p>
            <ul>
              <li>Post-War Design Renaissance</li>
              <li>Iconic Furniture Creations</li>
              <li>Blending Form and Function</li>
              <li>Designing for a New Era</li>
              <li>Legacy of the Eames Duo</li>
            </ul>
          </div>
          <div
            class="col-span-3 col-start-7 md:flex-row flex flex-col md:col-span-2 md:col-start-8 gap-[30px]"
          >
            <p>1947</p>
            <ul>
              <li>Continued Innovation</li>
              <li>Expanding Design Horizons</li>
              <li>Influence on Modern Aesthetics</li>
              <li>Timeless Design Principles</li>
              <li>Enduring Impact of Eames</li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>
