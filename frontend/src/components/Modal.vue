<template>
  <div class="modal-mask">
    <section class="modal">
      <div class="close" @click="$router.go(-1)"></div>
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Modal',
};
</script>

<style scoped lang="scss">
  .modal-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
    background-color: rgba(#000000, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: $space-large;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .close{
    position: absolute;
    right: $space-base;
    top: $space-base;
    cursor: pointer;
    &::after {
      content: '\00d7';
      display: block;
      color: $color-secondary;
      font-size: 2rem;
    }
  }
</style>
