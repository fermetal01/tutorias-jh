import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './horario-materia.reducer';
import { IHorarioMateria } from 'app/shared/model/horario-materia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHorarioMateriaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class HorarioMateria extends React.Component<IHorarioMateriaProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { horarioMateriaList, match } = this.props;
    return (
      <div>
        <h2 id="horario-materia-heading">
          <Translate contentKey="tutoriasApp.horarioMateria.home.title">Horario Materias</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tutoriasApp.horarioMateria.home.createLabel">Create a new Horario Materia</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {horarioMateriaList && horarioMateriaList.length > 0 ? (
            <Table responsive aria-describedby="horario-materia-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.horarioMateria.profesor">Profesor</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.horarioMateria.horaInicio">Hora Inicio</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.horarioMateria.horaFin">Hora Fin</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.horarioMateria.dia">Dia</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.horarioMateria.materia">Materia</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.horarioMateria.profesor">Profesor</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {horarioMateriaList.map((horarioMateria, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${horarioMateria.id}`} color="link" size="sm">
                        {horarioMateria.id}
                      </Button>
                    </td>
                    <td>{horarioMateria.profesor}</td>
                    <td>{horarioMateria.horaInicio}</td>
                    <td>{horarioMateria.horaFin}</td>
                    <td>
                      <Translate contentKey={`tutoriasApp.Dia.${horarioMateria.dia}`} />
                    </td>
                    <td>
                      {horarioMateria.materia ? <Link to={`materia/${horarioMateria.materia.id}`}>{horarioMateria.materia.id}</Link> : ''}
                    </td>
                    <td>
                      {horarioMateria.profesor ? (
                        <Link to={`profesor/${horarioMateria.profesor.id}`}>{horarioMateria.profesor.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${horarioMateria.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${horarioMateria.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${horarioMateria.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tutoriasApp.horarioMateria.home.notFound">No Horario Materias found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ horarioMateria }: IRootState) => ({
  horarioMateriaList: horarioMateria.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HorarioMateria);
