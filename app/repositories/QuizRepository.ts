import { BaseRepository } from "./BaseRepository";
import type {
  QuizCreateDTO,
  QuizData,
  QuizQueryParams,
  QuizQuestion,
  QuizUpdateDTO
} from "~/types/api/Quiz";

class QuizRepository extends BaseRepository {
  private readonly resource = "/v1/admin/quizzes/";

  getAll(query?: QuizQueryParams): Promise<QuizData[]> {
    return this.call<QuizData[]>(this.resource, {
      query
    });
  }

  getById(id: number): Promise<QuizData> {
    return this.call<QuizData>(this.resource + id + "/");
  }

  create(dto: QuizCreateDTO): Promise<QuizData> {
    return this.call<QuizData>(this.resource, {
      method: "POST",
      body: dto
    });
  }

  update(id: number, dto: QuizUpdateDTO): Promise<QuizData> {
    return this.call<QuizData>(`${this.resource}${id}/`, {
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

export default QuizRepository;
