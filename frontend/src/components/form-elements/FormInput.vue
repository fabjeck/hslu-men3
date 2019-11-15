<template>
  <div class="form-group">
    <label :for="id">{{label}}</label>
    <input :type="type" :id="id" class="form-element">
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
};
</script>
