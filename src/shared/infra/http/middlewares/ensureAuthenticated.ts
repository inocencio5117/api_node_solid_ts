import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokenRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  const usersTokenRepository = new UsersTokenRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;
    console.log(user_id);

    const user = usersTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User does not exist", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
