<template>
  <div class="container">
    <mod-details v-if="mod" :mod="mod" @like="onToggleLike"/>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {ModDto} from '../../../shared/dto/ModDto';
import ModDetails from '../components/ModDetails.vue';
import {useLikes} from '../compositions/useLikes';
import {toaster} from '../modules/toaster';
import {META_BANNER} from "../const/meta.const";
import { useSeoMeta } from '@unhead/vue';
import { getMod } from '../api';

const modId = useRoute().params.id as string; // routing ensures this value is present
const mod = ref<ModDto>();
const { onToggleLike } = useLikes(mod as Ref<ModDto>); // TODO improve typing, move useLikes to respective component
const meta = useSeoMeta({
  title: `Loading ${modId}...`,
});

async function loadMod() {
  const route = useRoute();
  const router = useRouter();
  const { data, error } = await getMod({path: { id: modId }});

  if (error !== undefined) {
    // TODO distinguish between not found and other errors
    toaster.error(`Mod ${modId} not found`);
    await router.replace({name: 'mods'});
  } else {
    mod.value = data as ModDto; // TODO improve typing
    meta.patch({
      title: mod.value?.title,
      description: mod.value?.description,
      ogImage:  mod.value?.bannerImageUrl || META_BANNER,
    });
  }
}
loadMod();
</script>