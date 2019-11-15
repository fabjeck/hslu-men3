<template>
  <div class="signup">
    <section class="auth-modal">
     <form>
        <FormInput label="Username" type="text" id="username"/>
        <FormInput label="Password" type="password" id="password"/>
        <FormButton label="Sign Up"/>
        <FormLink name="login">
          <template v-slot:login>
            Already registered? <router-link to="/login">Login</router-link> to write a blog post.
          </template>
        </FormLink>
     </form>
   </section>
  </div>
</template>

<script>
import FormInput from '@/components/form-elements/FormInput.vue';
import FormButton from '@/components/form-elements/FormButton.vue';
import FormLink from '@/components/form-elements/FormLink.vue';

export default {
  name: 'SignUp',
  components: {
    FormInput,
    FormButton,
    FormLink,
  },
};
</script>

<style scoped lang="scss">
  .signup {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
  }
</style>
