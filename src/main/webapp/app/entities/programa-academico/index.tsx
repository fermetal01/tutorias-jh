import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProgramaAcademico from './programa-academico';
import ProgramaAcademicoDetail from './programa-academico-detail';
import ProgramaAcademicoUpdate from './programa-academico-update';
import ProgramaAcademicoDeleteDialog from './programa-academico-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProgramaAcademicoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProgramaAcademicoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProgramaAcademicoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProgramaAcademico} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProgramaAcademicoDeleteDialog} />
  </>
);

export default Routes;
