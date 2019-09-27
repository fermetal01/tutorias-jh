import { IDepartamento } from 'app/shared/model/departamento.model';
import { IMateria } from 'app/shared/model/materia.model';
import { IEstudiante } from 'app/shared/model/estudiante.model';

export interface IProgramaAcademico {
  id?: number;
  codigo?: string;
  nombre?: string;
  url?: string;
  correo?: string;
  departamento?: IDepartamento;
  materias?: IMateria[];
  estudiante?: IEstudiante;
}

export const defaultValue: Readonly<IProgramaAcademico> = {};
