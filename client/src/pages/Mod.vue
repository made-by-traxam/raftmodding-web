<template>
  <div class="container">
    <mod-details v-if="mod" :mod="mod" @like="onToggleLike"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {ModDto} from '../../../shared/dto/ModDto';
import ModDetails from '../components/ModDetails.vue';
import {useLikes} from '../compositions/useLikes';
import {api} from '../modules/api';
import {toaster} from '../modules/toaster';
import {META_BANNER} from "../const/meta.const";
import { useSeoMeta } from '@unhead/vue';

export default defineComponent({
  name: 'ModPage',
  components: {
    ModDetails,
  },
  setup() {
    const mod = ref<ModDto>();
    const meta = useSeoMeta({
      title: 'Loading mod...',
    });

    (async () => {
      const route = useRoute();
      const router = useRouter();
      mod.value = await api.getMod(route.params.id as string);

      if (!mod.value) {
        const modId = route.params.id;
        await router.replace({name: 'mods'});
        toaster.error(`Mod ${modId} not found`);
      }

      meta.patch({
        title: mod.value?.title,
        description: mod.value?.description,
        ogImage:  mod.value?.bannerImageUrl || META_BANNER,
      });
    })();

    return {
      mod,
      ...useLikes(mod as Ref<ModDto>),
    };
  },
});
</script>