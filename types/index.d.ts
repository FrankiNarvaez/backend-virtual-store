declare namespace NodeJS {
  interface ProcessEnv {
    HOST_DB: string;
    NAME_DB: string;
    PORT_DB: number;
    USER_DB: string;
    PASSWORD_DB: string;
    URL_DB: string;
    PORT: number;
    HASH_SALT: number;
  }
}
