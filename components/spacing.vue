<template>
    <div :class="spacingClass"></div>
</template>

<script>
export default {
    name: "spacing",
    props: {
        size4: { type: Boolean, default: false },
        size8: { type: Boolean, default: false },
        size16: { type: Boolean, default: false },
        size24: { type: Boolean, default: false },
        size32: { type: Boolean, default: false },
        size48: { type: Boolean, default: false },
        size64: { type: Boolean, default: false },
        size128: { type: Boolean, default: false },
        size256: { type: Boolean, default: false }
    },
    computed: {
        spacingClass() {
            if (this.size4) return 'h-1';
            if (this.size8) return 'h-2';
            if (this.size16) return 'h-4';
            if (this.size24) return 'h-6';
            if (this.size32) return 'h-8';
            if (this.size48) return 'h-12';
            if (this.size64) return 'h-16';
            if (this.size128) return 'h-32';
            if (this.size256) return 'h-64';
            return '';
        }
    }
};
</script>

<style scoped>
/* tailwindcss is used for styling, no additional styles needed */
</style>
