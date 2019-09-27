import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './departamento.reducer';
import { IDepartamento } from 'app/shared/model/departamento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDepartamentoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Departamento extends React.Component<IDepartamentoProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { departamentoList, match } = this.props;
    return (
      <div>
        <h2 id="departamento-heading">
          <Translate contentKey="tutoriasApp.departamento.home.title">Departamentos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tutoriasApp.departamento.home.createLabel">Create a new Departamento</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {departamentoList && departamentoList.length > 0 ? (
            <Table responsive aria-describedby="departamento-heading">
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.departamento.nombre">Nombre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.departamento.decano">Decano</Translate>
                  </th>
                  <th>
                    <Translate contentKey="tutoriasApp.departamento.profesor">Profesor</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {departamentoList.map((departamento, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${departamento.id}`} color="link" size="sm">
                        {departamento.id}
                      </Button>
                    </td>
                    <td>{departamento.nombre}</td>
                    <td>{departamento.decano}</td>
                    <td>
                      {departamento.profesor ? <Link to={`profesor/${departamento.profesor.id}`}>{departamento.profesor.id}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${departamento.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${departamento.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${departamento.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tutoriasApp.departamento.home.notFound">No Departamentos found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ departamento }: IRootState) => ({
  departamentoList: departamento.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Departamento);
