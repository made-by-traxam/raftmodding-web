<template>
  <changelog
    :version="loaderVersion.rmlVersion"
    :readme="loaderVersion.readme"
    :release-date="loaderVersion.timestamp"
    :last-update="loaderVersion.updatedAt"
    software-name="RML LOADER"
  />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

import { api } from '../modules/api';
import { LoaderVersion } from '../types';

import { useHead } from '@unhead/vue';
import Changelog from '../components/Changelog.vue';

export default defineComponent({
  name: 'LoaderChangelogPage',
  components: { Changelog },
  setup() {
    const loaderVersion: Ref<LoaderVersion> = ref({} as LoaderVersion);

    (async () => {
      const route: RouteLocationNormalizedLoaded = useRoute();
      loaderVersion.value = await api.getLoaderVersion(
        route.params.version as string,
      );

      useHead({
        title: `RML v${loaderVersion.value.rmlVersion}`,
      });
    })();

    return {
      loaderVersion,
    };
  },
});
</script>