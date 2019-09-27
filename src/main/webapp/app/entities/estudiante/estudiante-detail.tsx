import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './estudiante.reducer';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEstudianteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EstudianteDetail extends React.Component<IEstudianteDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { estudianteEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tutoriasApp.estudiante.detail.title">Estudiante</Translate> [<b>{estudianteEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="carrera">
                <Translate contentKey="tutoriasApp.estudiante.carrera">Carrera</Translate>
              </span>
            </dt>
            <dd>{estudianteEntity.carrera}</dd>
            <dt>
              <Translate contentKey="tutoriasApp.estudiante.user">User</Translate>
            </dt>
            <dd>{estudianteEntity.user ? estudianteEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/estudiante" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/estudiante/${estudianteEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ estudiante }: IRootState) => ({
  estudianteEntity: estudiante.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EstudianteDetail);
