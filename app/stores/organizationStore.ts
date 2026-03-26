import { defineStore } from "pinia";
import { useStoreRequest } from "~/composables/useStoreRequest";
import type {
  OrganizationCreateDTO,
  OrganizationData,
  OrganizationUpdateDTO
} from "~/types/api/Organization";

export const useOrganizationStore = defineStore("organization", () => {
  const { $repositories } = useNuxtApp();
  const { error, isLoading, load } = useStoreRequest();

  const organizations = ref<OrganizationData[]>([]);

  const fetchOrganizations = async () => {
    try {
      const response = await load<OrganizationData[]>(() => $repositories.organization.getAll());
      organizations.value = response;

      return response;
    } catch (e) {
      error.value = "Не удалось загрузить список организаций";
      throw e;
    }
  };

  const createOrganization = async (dto: OrganizationCreateDTO) => {
    return await load<OrganizationData>(() => $repositories.organization.create(dto));
  };

  const updateOrganization = async (id: number, dto: OrganizationUpdateDTO) => {
    return await load<OrganizationData>(() => $repositories.organization.update(id, dto));
  };

  const deleteOrganization = async (id: number) => {
    return await load(() => $repositories.organization.delete(id));
  };

  return {
    isLoading,
    error,
    organizations,

    fetchOrganizations,
    createOrganization,
    updateOrganization,
    deleteOrganization
  };
});
