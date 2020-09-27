<template>
  <div ref="scrollContainer" class="scrollable">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AutoScroll',
  data() {
    return {
      // eslint-disable-next-line no-unused-vars
      observer: new MutationObserver((mutations, observer) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            this.$refs.scrollContainer.scrollTop = this.$refs.scrollContainer.scrollHeight;
          }
        });
      }),
    };
  },
  mounted() {
    const config = {
      childList: true,
      subtree: true,
    };
    this.observer.observe(this.$refs.scrollContainer, config);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.scrollable {
  height: calc(100% - 22px);
  width: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #aaa;
  }
  &::-webkit-scrollbar-track {
    background: #ddd;
  }
}
</style>
