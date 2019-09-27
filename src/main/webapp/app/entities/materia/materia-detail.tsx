import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './materia.reducer';
import { IMateria } from 'app/shared/model/materia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMateriaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MateriaDetail extends React.Component<IMateriaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { materiaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tutoriasApp.materia.detail.title">Materia</Translate> [<b>{materiaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="codigo">
                <Translate contentKey="tutoriasApp.materia.codigo">Codigo</Translate>
              </span>
            </dt>
            <dd>{materiaEntity.codigo}</dd>
            <dt>
              <span id="nombre">
                <Translate contentKey="tutoriasApp.materia.nombre">Nombre</Translate>
              </span>
            </dt>
            <dd>{materiaEntity.nombre}</dd>
            <dt>
              <span id="creditos">
                <Translate contentKey="tutoriasApp.materia.creditos">Creditos</Translate>
              </span>
            </dt>
            <dd>{materiaEntity.creditos}</dd>
          </dl>
          <Button tag={Link} to="/entity/materia" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/materia/${materiaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ materia }: IRootState) => ({
  materiaEntity: materia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MateriaDetail);
