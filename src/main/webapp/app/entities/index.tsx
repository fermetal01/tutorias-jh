import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Departamento from './departamento';
import ProgramaAcademico from './programa-academico';
import Materia from './materia';
import HorarioMateria from './horario-materia';
import Tutoria from './tutoria';
import Comentario from './comentario';
import Estudiante from './estudiante';
import Profesor from './profesor';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/departamento`} component={Departamento} />
      <ErrorBoundaryRoute path={`${match.url}/programa-academico`} component={ProgramaAcademico} />
      <ErrorBoundaryRoute path={`${match.url}/materia`} component={Materia} />
      <ErrorBoundaryRoute path={`${match.url}/horario-materia`} component={HorarioMateria} />
      <ErrorBoundaryRoute path={`${match.url}/tutoria`} component={Tutoria} />
      <ErrorBoundaryRoute path={`${match.url}/comentario`} component={Comentario} />
      <ErrorBoundaryRoute path={`${match.url}/estudiante`} component={Estudiante} />
      <ErrorBoundaryRoute path={`${match.url}/profesor`} component={Profesor} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
