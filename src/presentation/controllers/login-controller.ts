import { Authentication } from "@/domain/useCases";
import { ok, unauthorized } from "../helpers/http-helpers";
import { Controller } from "../protocols";

export class LoginController implements Controller {
  constructor(private readonly authenticationUseCase: Authentication) {}

  handle = async (request: LoginController.Request) => {
    const { email, password } = request;
    const authResult = await this.authenticationUseCase.auth({
      email,
      password,
    });

    if (!authResult) {
      return unauthorized();
    }

    return ok(authResult);
  };
}

export namespace LoginController {
  export type Request = {
    email: string;
    password: string;
  };
}
