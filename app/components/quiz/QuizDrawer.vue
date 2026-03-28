<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import type { FormSubmitEvent } from "@primevue/forms";
import type { QuizCreateDTO, QuizData, QuizUpdateDTO } from "~/types/api/Quiz";
import { useAuthStore } from "~/stores/authStore";
import { quizSchema } from "~/utils/validadors/quiz";

const props = defineProps<{
  quiz?: QuizData | null;
}>();

const emit = defineEmits<{
  saved: [];
}>();

const visible = defineModel<boolean>("visible");

const quizStore = useQuizStore();
const organizationStore = useOrganizationStore();

const { organizations, isLoading: orgLoading } = storeToRefs(organizationStore);
const { user, isAdmin } = storeToRefs(useAuthStore());
const { showWarn, showSuccess } = useAppToast();
const { isLoading, error } = storeToRefs(quizStore);
const hintPopover = ref();

const isEdit = computed(() => !!props.quiz);
const resolver = ref(zodResolver(quizSchema));

const initialValues = computed(() => ({
  name: props.quiz?.name ?? "",
  description: props.quiz?.description ?? "",
  organization_id: isEdit.value ? props.quiz?.organization?.id : user.value?.organization.id,
  total_questions: props.quiz?.total_questions ?? 10,
  is_active: isEdit.value ? props.quiz?.is_active : false
}));

const onSubmit = async ({ values, valid }: FormSubmitEvent) => {
  if (!valid) return;

  try {
    if (isEdit.value && props.quiz) {
      await quizStore.updateQuiz(props.quiz.id, values as QuizUpdateDTO);
      showSuccess("Викторина обновлена");
    } else {
      await quizStore.createQuiz(values as QuizCreateDTO);
      showSuccess("Викторина создана");
    }
    visible.value = false;
    emit("saved");
  } catch {
    showWarn(
      isEdit.value ? "Не удалось обновить викторину" : "Не удалось создать викторину",
      error.value ?? ""
    );
  }
};

onMounted(async () => {
  if (!organizations.value) {
    await organizationStore.fetchOrganizations();
  }
});
</script>

<template>
  <Drawer
    v-model:visible="visible"
    :header="isEdit ? 'Редактирование викторины' : 'Добавление викторины'"
    position="right"
    class="quiz-drawer"
  >
    <Form
      v-slot="$form"
      :key="quiz?.id ?? 'new'"
      class="quiz-drawer__form"
      :initial-values="initialValues"
      :resolver
      :validate-on-blur="true"
      :validate-on-value-update="false"
      @submit="onSubmit"
    >
      <FormField v-slot="$field" name="name" class="quiz-drawer__field">
        <label>Название *</label>
        <InputText placeholder="Насколько хорошо ты знаешь Ставропольский край" fluid />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="description" class="quiz-drawer__field">
        <label>Описание *</label>
        <Textarea auto-resize rows="2" fluid />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="organization_id" class="quiz-drawer__field">
        <label>Организация *</label>
        <Select
          filter
          option-label="name"
          option-value="id"
          placeholder="Организация"
          fluid
          show-clear
          :loading="orgLoading"
          :disabled="!isAdmin"
          :options="organizations ?? []"
        />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="total_questions" class="quiz-drawer__field">
        <div class="quiz-drawer__label">
          <label>Количество вопросов *</label>
          <i
            class="pi pi-question-circle quiz-drawer__hint-icon"
            @click="hintPopover.toggle($event)"
          />
          <Popover ref="hintPopover">
            <div class="quiz-drawer__popover-content">
              <p>
                Сколько вопросов увидит пользователь за одно прохождение. Если вопросов в базе
                больше — каждый раз будет выбираться случайный набор, что делает викторину
                интереснее при повторных прохождениях.
              </p>
              <p>
                <strong>Важно:</strong> опубликовать викторину можно только после того, как
                количество добавленных вопросов достигнет указанного здесь значения.
              </p>

              <p>
                <i>Вопросы добавляются после создания викторины</i>
              </p>
            </div>
          </Popover>
        </div>
        <InputText fluid :invalid="$field?.invalid" inputmode="numeric" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <div class="quiz-drawer__footer">
        <Button
          type="button"
          label="Отмена"
          severity="secondary"
          :disabled="isLoading"
          @click="visible = false"
        />
        <Button
          type="submit"
          :label="isEdit ? 'Сохранить' : 'Создать'"
          :icon="isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-check'"
          :disabled="!$form.valid || isLoading"
        />
      </div>
    </Form>
  </Drawer>
</template>

<style scoped lang="scss">
.quiz-drawer {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    label {
      color: var(--color-text-gray);
    }
  }

  &__label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  &__hint-icon {
    font-size: pxToRem(13);
    color: var(--color-text-gray);
    cursor: pointer;
    transition: color 0.15s ease;

    &:hover {
      color: var(--color-primary);
    }
  }

  &__popover-content {
    max-width: 280px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: pxToRem(13);
    line-height: 1.5;
    color: var(--color-text-primary);

    p {
      margin: 0;
    }
  }

  &__footer {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--p-surface-200);
  }
}
</style>
