import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import departamento, {
  DepartamentoState
} from 'app/entities/departamento/departamento.reducer';
// prettier-ignore
import programaAcademico, {
  ProgramaAcademicoState
} from 'app/entities/programa-academico/programa-academico.reducer';
// prettier-ignore
import materia, {
  MateriaState
} from 'app/entities/materia/materia.reducer';
// prettier-ignore
import horarioMateria, {
  HorarioMateriaState
} from 'app/entities/horario-materia/horario-materia.reducer';
// prettier-ignore
import tutoria, {
  TutoriaState
} from 'app/entities/tutoria/tutoria.reducer';
// prettier-ignore
import comentario, {
  ComentarioState
} from 'app/entities/comentario/comentario.reducer';
// prettier-ignore
import estudiante, {
  EstudianteState
} from 'app/entities/estudiante/estudiante.reducer';
// prettier-ignore
import profesor, {
  ProfesorState
} from 'app/entities/profesor/profesor.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly departamento: DepartamentoState;
  readonly programaAcademico: ProgramaAcademicoState;
  readonly materia: MateriaState;
  readonly horarioMateria: HorarioMateriaState;
  readonly tutoria: TutoriaState;
  readonly comentario: ComentarioState;
  readonly estudiante: EstudianteState;
  readonly profesor: ProfesorState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  departamento,
  programaAcademico,
  materia,
  horarioMateria,
  tutoria,
  comentario,
  estudiante,
  profesor,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
