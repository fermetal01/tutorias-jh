import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './comentario.reducer';
import { IComentario } from 'app/shared/model/comentario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IComentarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Comentario extends React.Component<IComentarioProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { comentarioList, match } = this.props;
    return (
      <div>
        <h2 id="comentario-heading">
          <Translate contentKey="tutoriasApp.comentario.home.title">Comentarios</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tutoriasApp.comentario.home.createLabel">Create a new Comentario</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {comentarioList && comentarioList.length > 0 ? (
            <Table responsive aria-describedby="comentario-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.comentario.comentarioInicial">Comentario Inicial</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.comentario.padre">Padre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.comentario.descripcion">Descripcion</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.comentario.usuario">Usuario</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.comentario.tutoria">Tutoria</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {comentarioList.map((comentario, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${comentario.id}`} color="link" size="sm">
                        {comentario.id}
                      </Button>
                    </td>
                    <td>{comentario.comentarioInicial}</td>
                    <td>{comentario.padre}</td>
                    <td>{comentario.descripcion}</td>
                    <td>{comentario.usuario}</td>
                    <td>{comentario.tutoria ? <Link to={`tutoria/${comentario.tutoria.id}`}>{comentario.tutoria.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${comentario.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${comentario.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${comentario.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="tutoriasApp.comentario.home.notFound">No Comentarios found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ comentario }: IRootState) => ({
  comentarioList: comentario.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comentario);
