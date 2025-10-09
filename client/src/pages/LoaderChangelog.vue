<template>
  <changelog
    v-if="loaderVersion !== undefined"
    :version="loaderVersion.rmlVersion"
    :readme="loaderVersion.readme! /* TODO: improve typing */"
    :release-date="loaderVersion.timestamp"
    :last-update="loaderVersion.updatedAt! /* TODO: improve typing */"
    software-name="Raft Mod Loader"
  />
  <changelog-placeholder v-else/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { LoaderVersion } from '../types';
import { useSeoMeta } from '@unhead/vue';
import Changelog from '../components/Changelog.vue';
import ChangelogPlaceholder from '../components/ChangelogPlaceholder.vue';
import { read3, read4 } from '../api';

const loaderVersion= ref<LoaderVersion | undefined>(undefined);
const versionSlug = useRoute().params.version as string;
const meta = useSeoMeta()

async function loadLoaderVersion() {
  const { data, error } = await read4({ path: { rmlVersion: versionSlug }});
  if (error !== undefined) {
    console.error(`Error while fetching RML version ${versionSlug}:`, error);
  } else {
    loaderVersion.value = data as unknown as LoaderVersion; // TODO: improve typing
    meta.patch({
      title: `RML v${loaderVersion.value.rmlVersion}`,
    });
  }
}
loadLoaderVersion();
</script>