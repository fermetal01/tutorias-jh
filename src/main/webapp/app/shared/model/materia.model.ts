import { IHorarioMateria } from 'app/shared/model/horario-materia.model';
import { ITutoria } from 'app/shared/model/tutoria.model';

export interface IMateria {
  id?: number;
  codigo?: string;
  nombre?: string;
  creditos?: number;
  horarios?: IHorarioMateria[];
  tutorias?: ITutoria[];
}

export const defaultValue: Readonly<IMateria> = {};
