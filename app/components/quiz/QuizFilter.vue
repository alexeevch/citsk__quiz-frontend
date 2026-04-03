<script setup lang="ts">
import type { QuizQueryParams } from "~/types/api/Quiz";

const props = defineProps<{
  modelValue: QuizQueryParams;
}>();

const organizationStore = useOrganizationStore();
const { organizations, isLoading: orgLoading } = storeToRefs(organizationStore);
const { isAdmin } = storeToRefs(useAuthStore());
const { activityFilters } = useQuizFilters();
await useAsyncData(
  "organizations",
  async () => {
    if (!organizations.value) await organizationStore.fetchOrganizations();
    return organizations.value;
  },
  { lazy: true }
);

const emit = defineEmits<{
  "update:modelValue": [v: QuizQueryParams];
}>();
</script>

<template>
  <div class="quiz-filter">
    <h2 class="quiz-filter__title">
      <span>Фильтры</span>
      <i class="quiz-filter__title-icon pi pi-filter" />
    </h2>
    <div class="quiz-filter__body">
      <div class="quiz-filter__item">
        <Select
          :model-value="modelValue.organization"
          filter
          option-label="name"
          option-value="id"
          placeholder="Организация"
          fluid
          show-clear
          :loading="orgLoading"
          :disabled="!isAdmin"
          :options="organizations ?? []"
          @update:model-value="emit('update:modelValue', { ...modelValue, organization: $event })"
        />
      </div>

      <div class="quiz-filter__item">
        <SelectButton
          :model-value="modelValue.is_active"
          size="small"
          option-label="label"
          option-value="value"
          :options="activityFilters"
          fluid
          @update:model-value="
            emit('update:modelValue', { ...modelValue, is_active: $event ?? undefined })
          "
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.quiz-filter {
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  border-radius: var(--border-radius-primary);
  background-color: var(--color-bg-border);

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    font-size: pxToRem(16);
    background-color: var(--color-bg-border);
    padding: 0.2rem var(--padding-card-sm);
    font-weight: 500;
    color: var(--color-text-gray);

    &-icon {
      font-size: pxToRem(14);
      font-weight: 600;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: var(--padding-card-sm);
    background-color: var(--color-bg-card);
    border-radius: var(--border-radius-primary);
  }
}
</style>
