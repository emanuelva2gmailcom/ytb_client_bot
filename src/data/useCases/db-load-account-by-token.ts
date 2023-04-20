import { LoadAccountByToken } from "@/domain/useCases";
import { Decrypter, LoadAccountByTokenRepository } from "../protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
    private readonly decrypter: Decrypter
  ) {}

  load = async (accessToken: string, role?: string | undefined) => {
    let token: string;
    try {
      token = await this.decrypter.decrypt(accessToken);
    } catch (error: any) {
      return null;
    }
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(
        accessToken,
        role
      );
      if (account) {
        return account;
      }
    }
    return null;
  };
}
