import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Comentario from './comentario';
import ComentarioDetail from './comentario-detail';
import ComentarioUpdate from './comentario-update';
import ComentarioDeleteDialog from './comentario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ComentarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ComentarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ComentarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={Comentario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ComentarioDeleteDialog} />
  </>
);

export default Routes;
