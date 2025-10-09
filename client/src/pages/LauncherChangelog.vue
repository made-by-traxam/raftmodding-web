<template>
  <changelog
    v-if="launcherVersion !== undefined"
    :version="launcherVersion.version"
    :readme="launcherVersion.changelog"
    :release-date="launcherVersion.timestamp"
    :last-update="launcherVersion.updatedAt! /* TODO: improve typing */"
    software-name="RML Launcher"
    :download-url="$route.params.downloadable ? launcherVersion.downloadUrl : ''"
  />
  <changelog-placeholder
    v-else
    :with-download="!!$route.params.downloadable"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { LauncherVersion } from '../types';
import Changelog from '../components/Changelog.vue';
import ChangelogPlaceholder from '../components/ChangelogPlaceholder.vue';
import { useSeoMeta } from '@unhead/vue';
import { read5 } from '../api';

const launcherVersion = ref<LauncherVersion | undefined>(undefined);
const meta = useSeoMeta({
  title: 'Loading launcher version...',
});
const versionSlug = useRoute().params.version as string;

async function loadLauncherVersion() {
  const { data, error } = await read5({ path: { version: versionSlug }});

  if (error !== undefined) {
    console.error(`Error while fetching launcher version ${data}:`, error);
  } else {
    launcherVersion.value = data as unknown as LauncherVersion; // TODO: improve typing
    meta.patch({
      title: `RML Launcher v${launcherVersion.value.version}`,
    });
  }
}
loadLauncherVersion();
</script>