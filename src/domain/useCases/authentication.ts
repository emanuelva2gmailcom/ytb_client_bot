export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Result | null>;
}

export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
    id: string;
  };
}
