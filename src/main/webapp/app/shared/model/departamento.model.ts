import { IProgramaAcademico } from 'app/shared/model/programa-academico.model';
import { IProfesor } from 'app/shared/model/profesor.model';

export interface IDepartamento {
  id?: number;
  nombre?: string;
  decano?: string;
  programas?: IProgramaAcademico[];
  profesor?: IProfesor;
}

export const defaultValue: Readonly<IDepartamento> = {};
