import { IHorarioMateria } from 'app/shared/model/horario-materia.model';
import { ITutoria } from 'app/shared/model/tutoria.model';
import { IDepartamento } from 'app/shared/model/departamento.model';
import { IUser } from 'app/shared/model/user.model';

export interface IProfesor {
  id?: number;
  area?: string;
  horarios?: IHorarioMateria[];
  tutorias?: ITutoria[];
  departamentos?: IDepartamento[];
  user?: IUser;
}

export const defaultValue: Readonly<IProfesor> = {};
