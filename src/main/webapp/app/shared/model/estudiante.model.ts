import { IProgramaAcademico } from 'app/shared/model/programa-academico.model';
import { ITutoria } from 'app/shared/model/tutoria.model';
import { IUser } from 'app/shared/model/user.model';

export interface IEstudiante {
  id?: number;
  carrera?: string;
  departamentos?: IProgramaAcademico[];
  tutorias?: ITutoria[];
  user?: IUser;
}

export const defaultValue: Readonly<IEstudiante> = {};
