import { BaseRepository } from "./BaseRepository";
import type { AnswerCreateDTO, AnswerData, AnswerUpdateDTO } from "~/types/api/Answer";

class AnswerRepository extends BaseRepository {
  private readonly resource = "/v1/admin/answers/";

  getAll(): Promise<AnswerData[]> {
    return this.call<AnswerData[]>(this.resource);
  }

  getById(id: number): Promise<AnswerData> {
    return this.call<AnswerData>(this.resource + id + "/");
  }

  create(dto: AnswerCreateDTO): Promise<AnswerData> {
    return this.call<AnswerData>(this.resource, {
      method: "POST",
      body: dto
    });
  }

  update(id: number, dto: AnswerUpdateDTO): Promise<AnswerData> {
    return this.call<AnswerData>(`${this.resource}${id}/`, {
      method: "PATCH",
      body: dto
    });
  }

  delete(id: number): Promise<undefined> {
    return this.call(this.resource + id + "/", {
      method: "DELETE"
    });
  }
}

export default AnswerRepository;
