<template>
  <div class="form-group">
    <p class="form-link">
      <slot :name="name"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'FormLink',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
