<template>
  <template v-if="!blank">
    <transition name="fade">
      <cookie-consent-modal />
    </transition>
    <the-main-nav />
    <div id="scrollable-content">
      <router-view />
      <the-main-footer />
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CookieConsentModal from './components/modals/CookieConsentModal.vue';
import TheMainFooter from './components/TheMainFooter.vue';
import TheMainNav from './components/TheMainNav.vue';
import { state } from './store/store';

export default defineComponent({
  components: { CookieConsentModal, TheMainFooter, TheMainNav },
  setup() {
    return {
      blank: state.blankPage
    };
  },
  mounted() {
    setTimeout(() => {
      document.body.classList.remove('no-transition');
    }, 1);
  },
});
</script>

<style scoped lang="scss">
@use './assets/styles/variables';

#scrollable-content {
  height: calc(100vh - #{variables.$main-nav-height});
  max-height: calc(100vh - #{variables.$main-nav-height});
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > ::v-deep(.container) {
    margin-top: auto;
    margin-bottom: auto;
  }
}
</style>
