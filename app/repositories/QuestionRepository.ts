import { BaseRepository } from "./BaseRepository";
import type { QuestionCreateDTO, QuestionData, QuestionUpdateDTO } from "~/types/api/Question";

class QuestionRepository extends BaseRepository {
  private readonly resource = "/v1/admin/questions/";

  getAll(): Promise<QuestionData[]> {
    return this.call<QuestionData[]>(this.resource);
  }

  getById(id: number): Promise<QuestionData> {
    return this.call<QuestionData>(this.resource + id + "/");
  }

  create(dto: QuestionCreateDTO): Promise<QuestionData> {
    return this.call<QuestionData>(this.resource, {
      method: "POST",
      body: dto
    });
  }

  update(id: number, dto: QuestionUpdateDTO): Promise<QuestionData> {
    return this.call<QuestionData>(`${this.resource}${id}/`, {
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

export default QuestionRepository;
