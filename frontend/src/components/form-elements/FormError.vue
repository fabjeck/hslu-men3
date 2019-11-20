<template>
  <div class="form-element form-error">
    {{ error }}
  </div>
</template>

<script>
export default {
  name: 'FormError',
  props: {
    error: String,
  },
};
</script>

<style scoped lang="scss">
  .form-error {
    background-color: $color-error;
    border: 1px solid darken($color-error, 20%);
    color: darken($color-error, 20%);
    margin-top: 5px;
    position: relative;
    &::before, &::after {
      content: "";
      display: block;
      height: 0;
      width: 0;
      position: absolute;
      bottom: 100%;
      left: 10px;
      border: solid transparent;
    }
    &::before {
      border-bottom-color: darken($color-error, 20%);
      border-width: 5px;
    }
    &::after {
      border-bottom-color: $color-error;
      border-width: 4px;
      margin-left: 1px;
    }
  }
</style>
