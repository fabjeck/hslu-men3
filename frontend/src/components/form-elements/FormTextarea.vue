<template>
  <div class="form-group">
    <label :for="id">{{label}}</label>
    <textarea :id="id" class="form-element"
    :value="value" @input="$emit('input', $event.target.value)">
    </textarea>
    <FormError v-if="error" :error="error"/>
  </div>
</template>

<script>
import FormError from './FormError.vue';

export default {
  name: 'FormtextArea',
  components: {
    FormError,
  },
  props: {
    label: String,
    id: String,
    value: String,
    error: String,
  },
};
</script>
