<script setup lang="ts">
import type { OrganizationData } from "~/types/api/Organization";
import { formatPhoneNumber } from "~/utils/formatters";

const store = useOrganizationStore();
const { showSuccess, showWarn } = useAppToast();
const confirm = useConfirm();
const { organizations, isLoading, error } = storeToRefs(store);

const drawerVisible = ref(false);
const selectedOrganization = ref<OrganizationData | null>(null);

const expandedRows = ref<OrganizationData[] | null>(null);

onMounted(() => store.fetchOrganizations());

const openCreate = () => {
  selectedOrganization.value = null;
  drawerVisible.value = true;
};

const openEdit = (org: OrganizationData) => {
  selectedOrganization.value = org;
  drawerVisible.value = true;
};

const onSaved = () => store.fetchOrganizations();

const confirmDelete = (org: OrganizationData) => {
  confirm.require({
    message: `Вы уверены, что хотите удалить «${org.name}»?`,
    header: "Подтверждение удаления",
    icon: "pi pi-exclamation-triangle",
    rejectLabel: "Отмена",
    acceptLabel: "Удалить",
    acceptClass: "danger",
    accept: async () => {
      try {
        await store.deleteOrganization(org.id);
        showSuccess("Организация удалена");
        await store.fetchOrganizations();
      } catch {
        showWarn("Не удалось удалить организацию", error.value ?? "");
      }
    }
  });
};
</script>

<template>
  <section class="org-section">
    <div class="org-section__header">
      <slot name="title">
        <h1>Организации</h1>
      </slot>
      <Button label="Добавить" icon="pi pi-plus" @click="openCreate" />
    </div>

    <DataTable
      v-model:expanded-rows="expandedRows"
      :value="organizations"
      :loading="isLoading"
      data-key="id"
      row-hover
      class="org-section__table"
    >
      <Column expander style="width: 3rem" />

      <Column field="id" header="ID" style="width: 5rem" />

      <Column field="name" header="Название" />

      <Column field="phone" header="Телефон">
        <template #body="{ data }">
          <span>
            {{ data.phone ? formatPhoneNumber(data.phone) : "-" }}
          </span>
        </template>
      </Column>

      <Column field="email" header="Email" />

      <Column style="width: 7rem">
        <template #body="{ data }">
          <div class="org-section__actions">
            <Button icon="pi pi-pencil" severity="secondary" text rounded @click="openEdit(data)" />
            <Button
              icon="pi pi-trash"
              severity="danger"
              text
              rounded
              @click="confirmDelete(data)"
            />
          </div>
        </template>
      </Column>

      <template #expansion="{ data }">
        <div class="org-section__expansion">
          <div v-if="data.site_url" class="org-section__expansion-item">
            <span class="org-section__expansion-label">Сайт</span>
            <span class="org-section__expansion-value">{{ data.site_url }}</span>
          </div>

          <div v-if="data.address" class="org-section__expansion-item">
            <span class="org-section__expansion-label">Адрес</span>
            <span class="org-section__expansion-value">{{ data.address }}</span>
          </div>
        </div>
      </template>

      <template #empty>
        <div class="org-section__empty">
          <i class="pi pi-inbox" />
          <span>Организации не найдены</span>
        </div>
      </template>
    </DataTable>

    <ConfirmDialog />

    <AdminOrganizationDrawer
      v-model:visible="drawerVisible"
      :organization="selectedOrganization"
      @saved="onSaved"
    />
  </section>
</template>

<style scoped lang="scss">
.org-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: var(--color-text-primary);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__icon {
    font-size: 1.1rem;
    color: var(--color-text-gray);
  }

  &__actions {
    display: flex;
    gap: 0.25rem;
  }

  &__expansion {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    &-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      &.a {
        color: var(--color-text-link);
      }
    }

    &-label {
      font-weight: 500;
      color: var(--color-text-primary);
    }
  }
}
</style>
