import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './programa-academico.reducer';
import { IProgramaAcademico } from 'app/shared/model/programa-academico.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProgramaAcademicoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ProgramaAcademico extends React.Component<IProgramaAcademicoProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { programaAcademicoList, match } = this.props;
    return (
      <div>
        <h2 id="programa-academico-heading">
          <Translate contentKey="tutoriasApp.programaAcademico.home.title">Programa Academicos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tutoriasApp.programaAcademico.home.createLabel">Create a new Programa Academico</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {programaAcademicoList && programaAcademicoList.length > 0 ? (
            <Table responsive aria-describedby="programa-academico-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.programaAcademico.codigo">Codigo</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.programaAcademico.nombre">Nombre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.programaAcademico.url">Url</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.programaAcademico.correo">Correo</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.programaAcademico.departamento">Departamento</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.programaAcademico.materia">Materia</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.programaAcademico.estudiante">Estudiante</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {programaAcademicoList.map((programaAcademico, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${programaAcademico.id}`} color="link" size="sm">
                        {programaAcademico.id}
                      </Button>
                    </td>
                    <td>{programaAcademico.codigo}</td>
                    <td>{programaAcademico.nombre}</td>
                    <td>{programaAcademico.url}</td>
                    <td>{programaAcademico.correo}</td>
                    <td>
                      {programaAcademico.departamento ? (
                        <Link to={`departamento/${programaAcademico.departamento.id}`}>{programaAcademico.departamento.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {programaAcademico.materias
                        ? programaAcademico.materias.map((val, j) => (
                            <span key={j}>
                              <Link to={`materia/${val.id}`}>{val.id}</Link>
                              {j === programaAcademico.materias.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td>
                      {programaAcademico.estudiante ? (
                        <Link to={`estudiante/${programaAcademico.estudiante.id}`}>{programaAcademico.estudiante.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${programaAcademico.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${programaAcademico.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${programaAcademico.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tutoriasApp.programaAcademico.home.notFound">No Programa Academicos found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ programaAcademico }: IRootState) => ({
  programaAcademicoList: programaAcademico.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramaAcademico);
