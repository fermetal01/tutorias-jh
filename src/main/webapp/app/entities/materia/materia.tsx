import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './materia.reducer';
import { IMateria } from 'app/shared/model/materia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMateriaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Materia extends React.Component<IMateriaProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { materiaList, match } = this.props;
    return (
      <div>
        <h2 id="materia-heading">
          <Translate contentKey="tutoriasApp.materia.home.title">Materias</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tutoriasApp.materia.home.createLabel">Create a new Materia</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {materiaList && materiaList.length > 0 ? (
            <Table responsive aria-describedby="materia-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.materia.codigo">Codigo</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.materia.nombre">Nombre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.materia.creditos">Creditos</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {materiaList.map((materia, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${materia.id}`} color="link" size="sm">
                        {materia.id}
                      </Button>
                    </td>
                    <td>{materia.codigo}</td>
                    <td>{materia.nombre}</td>
                    <td>{materia.creditos}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${materia.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${materia.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${materia.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tutoriasApp.materia.home.notFound">No Materias found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ materia }: IRootState) => ({
  materiaList: materia.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Materia);
