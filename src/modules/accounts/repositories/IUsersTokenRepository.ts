import { ICreateUserTokenDTO } from "../dtos/ICreateUserTOkenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokenRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokenRepository };
