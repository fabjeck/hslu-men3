<template>
  <div class="form-group">
    <button type="submit" class="form-element">{{ label }}</button>
  </div>
</template>

<script>
export default {
  name: 'FormButton',
  props: {
    label: String,
  },
};
</script>
