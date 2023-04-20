import { LoadAccountByToken } from "@/domain/useCases";
import { AccessDeniedError } from "../errors";
import { forbidden, ok, serverError } from "../helpers/http-helpers";
import { Middleware } from "../protocols";

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  handle = async (httpRequest: AuthMiddleware.Request) => {
    try {
      const { accessToken } = httpRequest;

      if (accessToken) {
        const account = await this.loadAccountByToken.load(
          accessToken,
          this.role
        );
        if (account) {
          return ok({ accountId: account.id });
        }
      }

      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error as Error);
    }
  };
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  };
}
