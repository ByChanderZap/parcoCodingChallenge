export interface Config {
  development: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
    use_env_variable: string;
  };
  test: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
    use_env_variable: string;
  };
  production: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
    use_env_variable: string;
  };
}
