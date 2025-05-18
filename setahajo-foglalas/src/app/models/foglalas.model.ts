import { Hajo } from './hajo.model';
import { Utas } from './utas.model';

export interface Foglalas {
  id: string;
  hajo: Hajo;
  utas: Utas;
  datum: Date;
}
