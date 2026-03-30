import { BaseRepository } from "./BaseRepository";
import type {
  OrganizationCreateDTO,
  OrganizationData,
  OrganizationUpdateDTO
} from "~/types/api/Organization";

class OrganizationRepository extends BaseRepository {
  private readonly resource = "/v1/admin/organizations/";

  getAll(): Promise<OrganizationData[]> {
    return this.call<OrganizationData[]>(this.resource);
  }

  getById(id: number): Promise<OrganizationData> {
    return this.call<OrganizationData>(this.resource + id);
  }

  create(dto: OrganizationCreateDTO): Promise<OrganizationData> {
    return this.call<OrganizationData>(this.resource, {
      method: "POST",
      body: dto
    });
  }

  update(id: number, dto: OrganizationUpdateDTO): Promise<OrganizationData> {
    return this.call<OrganizationData>(this.resource + id, {
      method: "PATCH",
      body: dto
    });
  }

  delete(id: number): Promise<undefined> {
    return this.call(this.resource + id, {
      method: "DELETE"
    });
  }
}

export default OrganizationRepository;
