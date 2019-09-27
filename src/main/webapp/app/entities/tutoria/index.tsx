import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Tutoria from './tutoria';
import TutoriaDetail from './tutoria-detail';
import TutoriaUpdate from './tutoria-update';
import TutoriaDeleteDialog from './tutoria-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TutoriaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TutoriaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TutoriaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Tutoria} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TutoriaDeleteDialog} />
  </>
);

export default Routes;
