import { IMateria } from 'app/shared/model/materia.model';
import { IComentario } from 'app/shared/model/comentario.model';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { IProfesor } from 'app/shared/model/profesor.model';
import { Dia } from 'app/shared/model/enumerations/dia.model';

export interface ITutoria {
  id?: number;
  horaInicio?: string;
  horaFin?: string;
  dia?: Dia;
  profesor?: string;
  estudiante?: string;
  tomada?: boolean;
  materia?: IMateria;
  comentarios?: IComentario[];
  estudiante?: IEstudiante;
  profesor?: IProfesor;
}

export const defaultValue: Readonly<ITutoria> = {
  tomada: false
};
