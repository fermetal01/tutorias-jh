import { ITutoria } from 'app/shared/model/tutoria.model';

export interface IComentario {
  id?: number;
  comentarioInicial?: string;
  padre?: string;
  descripcion?: string;
  usuario?: string;
  tutoria?: ITutoria;
}

export const defaultValue: Readonly<IComentario> = {};
