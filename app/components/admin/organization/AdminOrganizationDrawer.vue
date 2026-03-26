<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { organizationSchema } from "~/utils/validadors/organization";
import type { FormSubmitEvent } from "@primevue/forms";
import type {
  OrganizationData,
  OrganizationCreateDTO,
  OrganizationUpdateDTO
} from "~/types/api/Organization";

const props = defineProps<{
  organization?: OrganizationData | null;
}>();

const emit = defineEmits<{
  saved: [];
}>();

const visible = defineModel<boolean>("visible");

const store = useOrganizationStore();
const { showWarn, showSuccess } = useAppToast();
const { isLoading, error } = storeToRefs(store);

const isEdit = computed(() => !!props.organization);
const resolver = ref(zodResolver(organizationSchema));

const initialValues = computed(() => ({
  name: props.organization?.name ?? "",
  phone: props.organization?.phone ?? "",
  email: props.organization?.email ?? "",
  site_url: props.organization?.site_url ?? "",
  address: props.organization?.address ?? ""
}));

const onSubmit = async ({ values, valid }: FormSubmitEvent) => {
  if (!valid) return;

  try {
    if (isEdit.value && props.organization) {
      await store.updateOrganization(props.organization.id, values as OrganizationUpdateDTO);
      showSuccess("Организация обновлена");
    } else {
      await store.createOrganization(values as OrganizationCreateDTO);
      showSuccess("Организация создана");
    }
    visible.value = false;
    emit("saved");
  } catch {
    showWarn(
      isEdit.value ? "Не удалось обновить организацию" : "Не удалось создать организацию",
      error.value ?? ""
    );
  }
};
</script>

<template>
  <Drawer
    v-model:visible="visible"
    :header="isEdit ? 'Редактировать организацию' : 'Новая организация'"
    position="right"
    class="org-drawer"
  >
    <Form
      v-slot="$form"
      :key="organization?.id ?? 'new'"
      class="org-drawer__form"
      :initial-values="initialValues"
      :resolver
      :validate-on-blur="true"
      :validate-on-value-update="false"
      @submit="onSubmit"
    >
      <FormField v-slot="$field" name="name" class="org-drawer__field">
        <label>Название *</label>
        <InputText placeholder="ООО Пример" fluid />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="phone" class="org-drawer__field">
        <label>Телефон *</label>
        <InputMask mask="+7(999)999-99-99" placeholder="+7(865)25555-55" fluid />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="email" class="org-drawer__field">
        <label>Email *</label>
        <InputText type="email" placeholder="org@example.com" fluid />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="site_url" class="org-drawer__field">
        <label>Сайт</label>
        <InputText placeholder="https://cit-sk.ru" fluid />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="address" class="org-drawer__field">
        <label>Адрес</label>
        <InputText placeholder="г. Ставрополь, ул. Ломоносова, 1" fluid />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <div class="org-drawer__footer">
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
.org-drawer {
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
      font-size: 0.875rem;
      color: var(--color-text-gray);
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
