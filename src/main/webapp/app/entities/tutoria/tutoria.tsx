import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tutoria.reducer';
import { ITutoria } from 'app/shared/model/tutoria.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITutoriaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Tutoria extends React.Component<ITutoriaProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { tutoriaList, match } = this.props;
    return (
      <div>
        <h2 id="tutoria-heading">
          <Translate contentKey="tutoriasApp.tutoria.home.title">Tutorias</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tutoriasApp.tutoria.home.createLabel">Create a new Tutoria</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {tutoriaList && tutoriaList.length > 0 ? (
            <Table responsive aria-describedby="tutoria-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.tutoria.horaInicio">Hora Inicio</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.tutoria.horaFin">Hora Fin</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.tutoria.dia">Dia</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.tutoria.profesor">Profesor</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.tutoria.estudiante">Estudiante</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.tutoria.tomada">Tomada</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.tutoria.materia">Materia</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.tutoria.estudiante">Estudiante</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.tutoria.profesor">Profesor</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {tutoriaList.map((tutoria, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${tutoria.id}`} color="link" size="sm">
                        {tutoria.id}
                      </Button>
                    </td>
                    <td>{tutoria.horaInicio}</td>
                    <td>{tutoria.horaFin}</td>
                    <td>
                      <Translate contentKey={`tutoriasApp.Dia.${tutoria.dia}`} />
                    </td>
                    <td>{tutoria.profesor}</td>
                    <td>{tutoria.estudiante}</td>
                    <td>{tutoria.tomada ? 'true' : 'false'}</td>
                    <td>{tutoria.materia ? <Link to={`materia/${tutoria.materia.id}`}>{tutoria.materia.id}</Link> : ''}</td>
                    <td>{tutoria.estudiante ? <Link to={`estudiante/${tutoria.estudiante.id}`}>{tutoria.estudiante.id}</Link> : ''}</td>
                    <td>{tutoria.profesor ? <Link to={`profesor/${tutoria.profesor.id}`}>{tutoria.profesor.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${tutoria.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${tutoria.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${tutoria.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tutoriasApp.tutoria.home.notFound">No Tutorias found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tutoria }: IRootState) => ({
  tutoriaList: tutoria.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tutoria);
