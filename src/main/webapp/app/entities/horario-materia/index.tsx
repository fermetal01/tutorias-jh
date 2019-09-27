import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HorarioMateria from './horario-materia';
import HorarioMateriaDetail from './horario-materia-detail';
import HorarioMateriaUpdate from './horario-materia-update';
import HorarioMateriaDeleteDialog from './horario-materia-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HorarioMateriaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HorarioMateriaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HorarioMateriaDetail} />
      <ErrorBoundaryRoute path={match.url} component={HorarioMateria} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HorarioMateriaDeleteDialog} />
  </>
);

export default Routes;
