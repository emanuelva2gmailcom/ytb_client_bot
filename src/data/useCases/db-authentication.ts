import { Authentication } from "@/domain/useCases";
import {
  Encrypter,
  HashComparer,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from "../protocols";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
    private readonly encrypter: Encrypter
  ) {}

  auth = async (params: Authentication.Params) => {
    const { email, password } = params;

    const account = await this.loadAccountByEmailRepository.loadByEmail(email);
    if (account) {
      const isValid = await this.hashComparer.compare(
        password,
        account.password
      );
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        );
        return {
          accessToken,
          id: account.id,
        };
      }
    }
    return null;
  };
}
