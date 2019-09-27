import { IMateria } from 'app/shared/model/materia.model';
import { IProfesor } from 'app/shared/model/profesor.model';
import { Dia } from 'app/shared/model/enumerations/dia.model';

export interface IHorarioMateria {
  id?: number;
  profesor?: string;
  horaInicio?: string;
  horaFin?: string;
  dia?: Dia;
  materia?: IMateria;
  profesor?: IProfesor;
}

export const defaultValue: Readonly<IHorarioMateria> = {};
