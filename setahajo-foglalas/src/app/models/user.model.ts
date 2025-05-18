import { Foglalas } from "./foglalas.model";

export interface User {
    name: {
      firstname: string;
      lastname: string;
    };
    email: string;
    password: string;
    foglalas: Foglalas[];
  }