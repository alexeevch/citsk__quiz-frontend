import { BaseRepository } from "./BaseRepository";
import type {
  OrganizationCreateDTO,
  OrganizationData,
  OrganizationUpdateDTO
} from "~/types/api/Organization";

class OrganizationRepository extends BaseRepository {
  private readonly prefix = "/v1/organizations/";

  getAll(): Promise<OrganizationData[]> {
    return this.call<OrganizationData[]>(this.prefix);
  }

  getById(id: number): Promise<OrganizationData> {
    return this.call<OrganizationData>(this.prefix + id);
  }

  create(dto: OrganizationCreateDTO): Promise<OrganizationData> {
    return this.call<OrganizationData>(this.prefix, {
      method: "POST",
      body: dto
    });
  }

  update(id: number, dto: OrganizationUpdateDTO): Promise<OrganizationData> {
    return this.call<OrganizationData>(this.prefix + id, {
      method: "PATCH",
      body: dto
    });
  }

  delete(id: number): Promise<undefined> {
    return this.call(this.prefix + id, {
      method: "DELETE"
    });
  }
}

export default OrganizationRepository;
