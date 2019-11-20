<template>
  <div class="signup">
    <section class="auth-modal">
     <form @submit.prevent="submitHandler">
        <FormInput
          v-model.trim="firstName.value"
          :error="firstName.error"
          :label="firstName.label"
          type="text"
          id="firstName"/>
        <FormInput
          v-model.trim="lastName.value"
          :error="lastName.error"
          :label="lastName.label"
          type="text"
          id="lastName"/>
          <FormInput
          v-model.trim="email.value"
          :error="email.error"
          :label="email.label"
          type="text"
          id="email"/>
          <FormInput
          v-model.trim="password.value"
          :error="password.error"
          :label="password.label"
          type="password"
          id="password"/>
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
  data: () => ({
    firstName: {
      value: null,
      error: null,
      label: 'First name',
    },
    lastName: {
      value: null,
      error: null,
      label: 'Last name',
    },
    email: {
      value: null,
      error: null,
      label: 'Email',
    },
    password: {
      value: null,
      error: null,
      label: 'Password',
    },
  }),
  methods: {
    async submitHandler() {
      // Perform form validation
      if (this.checkForm()) {
        // Define request body
        const requestBody = {
          query: `
            mutation {
              createUser(userInput: {firstName: "${this.firstName.value}", lastName: "${this.lastName.value}", email: "${this.email.value}", password: "${this.password.value}"}) {
                user {
                  email
                }
                token
              }
            }
          `,
        };

        // Execute request
        try {
          const res = await fetch('http://localhost:3000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          if (!res.ok) {
            this.email.error = data.errors[0].message;
            return false;
          }
          return console.log(data);
        } catch (err) {
          return err;
        }
      } else {
        return false;
      }
    },
    checkForm() {
      // Check firstName
      if (!this.firstName.value) {
        this.firstName.error = `${this.firstName.label} can't be blank.`;
      } else {
        this.firstName.error = null;
      }

      // Check lastName
      if (!this.lastName.value) {
        this.lastName.error = `${this.lastName.label} can't be blank.`;
      } else {
        this.lastName.error = null;
      }

      // Check email
      if (!this.email.value) {
        this.email.error = `${this.email.label} can't be blank.`;
      } else if (!this.validEmail(this.email.value)) {
        this.email.error = `${this.email.label} has invalid format.`;
      } else {
        this.email.error = null;
      }

      // Check password
      if (!this.password.value) {
        this.password.error = `${this.password.label} can't be blank.`;
      } else if (this.password.value.length < 8) {
        this.password.error = `${this.password.label} must contain at least 8 characters.`;
      } else {
        this.password.error = null;
      }

      // Check if any errors occured
      if (
        !this.firstName.error
        && !this.lastName.error
        && !this.email.error
        && !this.password.error
      ) {
        return true;
      }
      return false;
    },
    validEmail: (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
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
