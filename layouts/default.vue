<template>
    <div class="data-scroll">
        <spacing :size64="true" class="col-span-9" />
        <nav class="col-span-9 flex justify-between font-[530] tracking-[-0.01em] relative bg-[hsla(0,0%,100%,0.5)] z-50
            backdrop-blur-md transition-all duration-300 mx-[60px]">
            <NuxtLink to="/" id="nav-logo" class="cursor-default">Frankliné&Co.</NuxtLink>
            <div class="min-w-[35vw] flex flex-row">
                <NuxtLink to="/products" id="nav-links" class="cursor-default">
                    Products, &nbsp;
                </NuxtLink>
                <NuxtLink to="/solutions" id="nav-links" class="cursor-default">
                    Solutions, &nbsp;
                </NuxtLink>
                <NuxtLink to="/stories" id="nav-links" class="cursor-pointer">Stories</NuxtLink>
            </div>
            <div id="nav-menu" class="cursor-default">Menu</div>
        </nav>
        <slot />
    </div>
</template>
