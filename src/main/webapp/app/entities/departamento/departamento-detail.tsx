import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './departamento.reducer';
import { IDepartamento } from 'app/shared/model/departamento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDepartamentoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DepartamentoDetail extends React.Component<IDepartamentoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { departamentoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tutoriasApp.departamento.detail.title">Departamento</Translate> [<b>{departamentoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nombre">
                <Translate contentKey="tutoriasApp.departamento.nombre">Nombre</Translate>
              </span>
            </dt>
            <dd>{departamentoEntity.nombre}</dd>
            <dt>
              <span id="decano">
                <Translate contentKey="tutoriasApp.departamento.decano">Decano</Translate>
              </span>
            </dt>
            <dd>{departamentoEntity.decano}</dd>
            <dt>
              <Translate contentKey="tutoriasApp.departamento.profesor">Profesor</Translate>
            </dt>
            <dd>{departamentoEntity.profesor ? departamentoEntity.profesor.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/departamento" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/departamento/${departamentoEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ departamento }: IRootState) => ({
  departamentoEntity: departamento.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartamentoDetail);
