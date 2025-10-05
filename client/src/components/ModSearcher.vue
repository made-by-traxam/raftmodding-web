<script setup lang="ts">
import { watch } from 'vue';
import { QueryParams } from '../../../shared/types/QueryParams';
import { useApiQuerying } from '../compositions/useApiQuerying';
import Icon from './Icon.vue';

interface ModSearcherProps {
  defaultQuery: QueryParams;
}

interface ModSearcherEmits {
  (e: 'search', query: QueryParams): void;
}

const props = defineProps<ModSearcherProps>();
const emit = defineEmits<ModSearcherEmits>();

const { filter, search, sort, query } = useApiQuerying();

query.value = props.defaultQuery;

watch(search, (search) => {
  if (!search) {
    emit('search', query.value);
  }
});

const onSubmit = () => {
  emit('search', query.value);
};

defineExpose({
  filter,
  search,
  sort,
  query,
});
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="row">
      <div class="col-0 col-md-6"></div>
      <div class="col-12 col-md-6">
        <div class="card w-100">
          <div class="input-group">
            <input
              v-model="search"
              aria-describedby="addon1"
              aria-label="test"
              class="form-control form-control-lg border-top-0 border-end-0 border-start-0 border-bottom-0"
              name="q"
              placeholder="Search..."
              type="search"
            />
            <div class="input-group-append">
              <button class="btn btn-primary" type="submit">
                <Icon name="search" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
