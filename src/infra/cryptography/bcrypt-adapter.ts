import { HashComparer, Hasher } from "@/data/protocols";
import { compare, hash } from "bcryptjs";

export class BcryptAdapter implements HashComparer, Hasher {
  constructor(private readonly salt: number) {}

  hash = async (plaintext: string) => {
    const digest = await hash(plaintext, this.salt);
    return digest;
  };

  compare = async (plaintext: string, digest: string) => {
    const isValid = await compare(plaintext, digest);
    return isValid;
  };
}
