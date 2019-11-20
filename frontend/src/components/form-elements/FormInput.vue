<template>
  <div class="form-group">
    <label :for="id">{{label}}</label>
    <input :type="type" :id="id" class="form-element"
    :value="value" @input="$emit('input', $event.target.value)">
    <FormError v-if="error" :error="error"/>
  </div>
</template>

<script>
import FormError from './FormError.vue';

export default {
  name: 'FormInput',
  components: {
    FormError,
  },
  props: {
    label: String,
    type: String,
    id: String,
    value: String,
    error: String,
  },
};
</script>
