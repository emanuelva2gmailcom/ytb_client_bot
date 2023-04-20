import { Decrypter, Encrypter } from "@/data/protocols";
import { sign, verify } from "jsonwebtoken";

export class JwtAdapter implements Decrypter, Encrypter {
  constructor(private readonly secret: string) {}

  encrypt = async (plaintext: string) => {
    const cyphertext = sign({ id: plaintext }, this.secret);
    return cyphertext;
  };

  decrypt = async (cyphertext: string) => {
    const plaintext = verify(cyphertext, this.secret).toString();
    return plaintext;
  };
}
