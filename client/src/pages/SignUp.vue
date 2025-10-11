<template>
  <div class="container">
    <div class="row justify-content-center my-5 mx-1">
      <div class="col-md-7">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Sign up</h5>
            <form @submit.prevent="onSubmit">
              <api-provided-form
                form-name="signUp"
                :data="data"
                @change="onFormChange"
              />
              <button
                v-if="state === 'ready'"
                class="btn btn-primary"
                type="submit"
              >
                Sign up
              </button>
              <button
                v-else-if="state === 'signing-up'"
                class="btn btn-primary"
                disabled
              >
                Signing you up...
              </button>
              <button
                v-else-if="state === 'signup-complete'"
                class="btn btn-success"
                disabled
              >
                Signup complete!
              </button>
            </form>
          </div>
        </div>
        <ul class="mt-2">
          <li>
            Already have an account?
            <router-link :to="{ name: 'signIn' }">Sign in</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApiProvidedForm from '../components/ApiProvidedForm.vue';
import { useForm } from '../compositions/useForm';
import { TOAST_FORM_INVALID, TOAST_SIGNUP_MAIL_SENT } from '../const/toasts.const';
import { toaster } from '../modules/toaster';
import { useSeoMeta } from '@unhead/vue';
import { AccountCreationDto, beginAccountCreation, completeAccountCreation } from '../api';

export default defineComponent({
  name: 'SignUpPage',
  components: { ApiProvidedForm },
  setup(_props, ctx) {
    useSeoMeta({
      title: 'Sign up',
    });

    return {
      ...useForm(ctx),
      state: 'ready' as ('ready' | 'signing-up' | 'signup-complete' | 'error'),
    };
  },
  async beforeRouteEnter(to) {
    const { token } = to.query;

    if (typeof token === 'string') {
      const { error } = await completeAccountCreation({
        path: {
          token,
        }
      });
      if (error !== undefined) {
        toaster.error('Account confirmation failed. Maybe it has expired?');
        return
      }
      toaster.success({
        message: `You account has been successfully created and confirmed. You can log in now.`,
        duration: 30 * 1000,
      });

      return { name: 'signIn' };
    }
  },
  methods: {
    async onSubmit() {
      if (this.state !== 'ready') {
        return;
      }
      if (this.errorCount > 0) {
        toaster.error(TOAST_FORM_INVALID);
        return;
      }

      this.state = 'signing-up';
      const { username, email, password, recaptcha } = this.data;

      // TODO improve typing:
      // - too many fields are optional (username, email, password)
      // - some should not be allowed (createdAt, updatedAt, token)
      // - one is missing (recaptcha)
      const { error } = await beginAccountCreation({
        body: {
          email,
          password,
          username,
          recaptcha
        } as AccountCreationDto
      });
      if (error) {
        this.state = 'ready';
        toaster.error({
          message: 'Could not create account. Maybe this username or email is already taken?', // TODO: distinguish user error from system error
          duration: 20 * 1000,
        });
        return;
      }

      this.state = 'signup-complete';
      await this.$router.push({ name: 'signIn' });
      toaster.success({
        message: TOAST_SIGNUP_MAIL_SENT,
        duration: 60 * 1000,
        icon: {
          className: 'fas fa-paper-plane text-white',
          tagName: 'i',
          text: '',
          color: '',
        },
      });
    },
  },
});
</script>
