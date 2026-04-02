<script setup lang="ts">
import type {
  QuestionCreateDTO,
  QuestionData,
  QuestionType,
  QuestionUpdateDTO
} from "~/types/api/Question";
import type { AnswerCreateDTO } from "~/types/api/Answer";
import { questionFormSchema } from "~/utils/validadors/question";

interface AnswerRow {
  id?: number;
  text: string;
  correct: boolean;
  sort_index: string;
}

const props = defineProps<{
  quizId: number;
  question?: QuestionData | null;
}>();

const emit = defineEmits<{
  saved: [];
}>();

const visible = defineModel<boolean>("visible");

const questionStore = useQuestionStore();
const answerStore = useAnswerStore();
const { showError, showSuccess, showWarn } = useAppToast();
const { isLoading: questionLoading, error: questionError } = storeToRefs(questionStore);
const { isLoading: answerLoading, error: answerError } = storeToRefs(answerStore);

const isEdit = computed(() => !!props.question);
const isLoading = computed(() => questionLoading.value || answerLoading.value);

const hintPopoverQuestion = ref();
const hintPopoverAnswer = ref();

const questionText = ref("");
const questionSortIndex = ref<string>("500");
const answers = ref<AnswerRow[]>([]);
const deletedAnswerIds = ref<number[]>([]);
const formErrors = ref<Record<string, string>>({});

const questionType = computed<QuestionType>(() => {
  return answers.value.filter((a) => a.correct).length > 1 ? "multiple" : "single";
});

const validate = (): boolean => {
  formErrors.value = {};

  const result = questionFormSchema.safeParse({
    question: questionText.value,
    sort_index: questionSortIndex.value,
    answers: answers.value
  });

  if (!result.success) {
    result.error.issues.forEach((err) => {
      const path = err.path.join(".");
      if (!formErrors.value[path]) {
        formErrors.value[path] = err.message;
      }
    });
    showWarn("Проверьте правильность заполнения полей");
    return false;
  }
  return true;
};

const addAnswer = () => {
  const maxSortIndex = answers.value.reduce((max, a) => Math.max(max, Number(a.sort_index)), 0);
  const nextSortIndex = maxSortIndex + 10;
  answers.value.push({ text: "", correct: false, sort_index: String(nextSortIndex) });
};

const removeAnswer = (index: number) => {
  const answer = answers.value[index];
  if (answer?.id !== undefined) {
    deletedAnswerIds.value.push(answer.id);
  }
  answers.value.splice(index, 1);
};

const onCorrectChange = (index: number) => {
  delete formErrors.value["answers_correct"];
};

const initForm = () => {
  if (props.question) {
    questionText.value = props.question.question;
    questionSortIndex.value = String(props.question.sort_index);
    answers.value = props.question.answers.map((a) => ({
      id: a.id,
      text: a.text,
      correct: a.correct,
      sort_index: String(a.sort_index)
    }));
  } else {
    questionText.value = "";
    questionSortIndex.value = "500";
    answers.value = [];
  }
  deletedAnswerIds.value = [];
  formErrors.value = {};
};

const onSubmit = async () => {
  if (!validate()) return;

  try {
    if (isEdit.value && props.question) {
      await questionStore.updateQuestion(props.question.id, {
        question: questionText.value,
        question_type: questionType.value,
        sort_index: Number(questionSortIndex.value)
      } as QuestionUpdateDTO);

      for (const id of deletedAnswerIds.value) {
        await answerStore.deleteAnswer(id);
      }

      for (const a of answers.value) {
        if (a.id !== undefined) {
          await answerStore.updateAnswer(a.id, {
            text: a.text,
            correct: a.correct,
            sort_index: Number(a.sort_index)
          });
        } else {
          await answerStore.createAnswer({
            text: a.text,
            correct: a.correct,
            question: props.question.id,
            sort_index: Number(a.sort_index)
          } as AnswerCreateDTO);
        }
      }

      showSuccess("Вопрос обновлён");
    } else {
      const created = await questionStore.createQuestion({
        question: questionText.value,
        question_type: questionType.value,
        quiz_id: props.quizId,
        sort_index: Number(questionSortIndex.value),
        answers: []
      } as QuestionCreateDTO);

      if (created) {
        for (const a of answers.value) {
          await answerStore.createAnswer({
            text: a.text,
            correct: a.correct,
            question: created.id,
            sort_index: Number(a.sort_index)
          } as AnswerCreateDTO);
        }
      }

      showSuccess("Вопрос создан");
    }

    visible.value = false;
    emit("saved");
  } catch {
    showError(
      isEdit.value ? "Не удалось обновить вопрос" : "Не удалось создать вопрос",
      questionError.value ?? answerError.value ?? ""
    );
  }
};

watch(visible, (val) => {
  if (val) initForm();
});
</script>

<template>
  <Drawer
    v-model:visible="visible"
    :header="isEdit ? 'Редактирование вопроса' : 'Добавление вопроса'"
    position="right"
    class="question-drawer"
  >
    <div class="question-drawer__form">
      <div class="question-drawer__field">
        <label>Текст вопроса *</label>
        <Textarea
          v-model="questionText"
          auto-resize
          rows="2"
          fluid
          :invalid="!!formErrors['question']"
          placeholder="Введите вопрос"
          @input="delete formErrors['question']"
        />
        <Message v-if="formErrors['question']" severity="error" size="small" variant="simple">
          {{ formErrors["question"] }}
        </Message>
      </div>

      <div class="question-drawer__field">
        <div class="question-drawer__label">
          <label>Сортировка вопроса *</label>
          <i
            class="pi pi-question-circle question-drawer__hint-icon"
            @click="hintPopoverQuestion.toggle($event)"
          />
          <Popover ref="hintPopoverQuestion">
            <div class="question-drawer__popover-content">
              <p>
                Определяет порядок отображения вопроса в списке. Чем меньше значение — тем выше
                вопрос будет в списке.
              </p>
              <p><i>По умолчанию — 500</i></p>
            </div>
          </Popover>
        </div>
        <InputText
          v-model.number="questionSortIndex"
          fluid
          inputmode="numeric"
          :invalid="!!formErrors['sort_index']"
          @input="delete formErrors['sort_index']"
        />
        <Message v-if="formErrors['sort_index']" severity="error" size="small" variant="simple">
          {{ formErrors["sort_index"] }}
        </Message>
      </div>

      <div class="question-drawer__answers">
        <div class="question-drawer__answers-header">
          <div class="question-drawer__label">
            <label>Ответы *</label>
          </div>
          <Button
            label="Добавить ответ"
            icon="pi pi-plus"
            size="small"
            severity="secondary"
            :disabled="isLoading"
            @click="addAnswer"
          />
        </div>

        <Message
          v-if="formErrors['answers'] || formErrors['answers_correct']"
          severity="error"
          size="small"
          variant="simple"
          class="question-drawer__answers-error"
        >
          {{ formErrors["answers"] ?? formErrors["answers_correct"] }}
        </Message>

        <TransitionGroup name="answer-list" tag="div" class="question-drawer__answers-list">
          <div v-for="(answer, index) in answers" :key="index" class="question-drawer__answer">
            <div class="question-drawer__answer-correct">
              <Checkbox v-model="answer.correct" :binary="true" @change="onCorrectChange(index)" />
            </div>

            <div class="question-drawer__answer-fields">
              <div class="question-drawer__answer-input">
                <label class="question-drawer__answer-label">Ответ {{ index + 1 }}</label>
                <InputText
                  v-model="answer.text"
                  fluid
                  :maxlength="35"
                  :invalid="!!formErrors[`answers.${index}.text`]"
                  placeholder="Вариант ответа"
                  @input="delete formErrors[`answers.${index}.text`]"
                />
                <Message
                  v-if="formErrors[`answers.${index}.text`]"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  {{ formErrors[`answers.${index}.text`] }}
                </Message>
              </div>

              <div class="question-drawer__answer-sort">
                <div class="question-drawer__label">
                  <label class="question-drawer__answer-label">Сортировка</label>
                  <i
                    class="pi pi-question-circle question-drawer__hint-icon"
                    @click="hintPopoverAnswer.toggle($event)"
                  />
                </div>
                <InputText
                  v-model="answer.sort_index"
                  fluid
                  inputmode="numeric"
                  :invalid="!!formErrors[`answers.${index}.sort_index`]"
                  placeholder="500"
                  @input="delete formErrors[`answers.${index}.sort_index`]"
                />
                <Message
                  v-if="formErrors[`answers.${index}.sort_index`]"
                  severity="error"
                  size="small"
                  variant="simple"
                >
                  {{ formErrors[`answers.${index}.sort_index`] }}
                </Message>
              </div>
            </div>

            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              rounded
              size="small"
              :disabled="isLoading"
              @click="removeAnswer(index)"
            />
          </div>
        </TransitionGroup>

        <Popover ref="hintPopoverAnswer">
          <div class="question-drawer__popover-content">
            <p>
              Определяет порядок отображения ответа. Чем меньше значение — тем выше ответ будет в
              списке.
            </p>
            <p><i>По умолчанию — 500</i></p>
          </div>
        </Popover>
      </div>

      <div class="question-drawer__footer">
        <Button
          type="button"
          label="Отмена"
          severity="secondary"
          :disabled="isLoading"
          @click="visible = false"
        />
        <Button
          type="button"
          :label="isEdit ? 'Сохранить' : 'Создать'"
          :icon="isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-check'"
          :disabled="isLoading"
          @click="onSubmit"
        />
      </div>
    </div>
  </Drawer>
</template>

<style scoped lang="scss">
.question-drawer {
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
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
    max-width: 260px;
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

  &__answers {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      label {
        color: var(--color-text-gray);
      }
    }

    &-error {
      margin-top: 0.25rem;
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
  }

  &__answer {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;

    &-correct {
      display: flex;
      align-items: center;
      padding-top: pxToRem(34);
      flex-shrink: 0;
    }

    &-fields {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    &-label {
      font-size: pxToRem(13);
      color: var(--color-text-gray);
    }

    &-input {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    &-sort {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
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

.answer-list {
  &-enter-active,
  &-leave-active {
    transition: all 0.2s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }
}
</style>
