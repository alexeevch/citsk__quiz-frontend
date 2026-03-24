import { BaseRepository } from "./BaseRepository";
import type { AuthLoginDTO, AuthLoginResponseDTO, AuthUserData } from "~/types/api/Auth";

class AuthRepository extends BaseRepository {
  private readonly prefix = "/v1/auth";

  login(credentials: AuthLoginDTO): Promise<AuthLoginResponseDTO> {
    return this.call<AuthLoginResponseDTO>(`${this.prefix}/login/`, {
      method: "POST",
      body: credentials
    });
  }

  refresh(): Promise<void> {
    return this.call(`${this.prefix}/token/refresh/`, {
      method: "POST"
    });
  }

  logout(): Promise<void> {
    return this.call(`${this.prefix}/logout/`, {
      method: "POST"
    });
  }

  getUser(): Promise<AuthUserData> {
    return this.call<AuthUserData>(`${this.prefix}/user/`);
  }
}

export default AuthRepository;
