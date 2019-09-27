import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './horario-materia.reducer';
import { IHorarioMateria } from 'app/shared/model/horario-materia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHorarioMateriaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HorarioMateriaDetail extends React.Component<IHorarioMateriaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { horarioMateriaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tutoriasApp.horarioMateria.detail.title">HorarioMateria</Translate> [<b>{horarioMateriaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="profesor">
                <Translate contentKey="tutoriasApp.horarioMateria.profesor">Profesor</Translate>
              </span>
            </dt>
            <dd>{horarioMateriaEntity.profesor}</dd>
            <dt>
              <span id="horaInicio">
                <Translate contentKey="tutoriasApp.horarioMateria.horaInicio">Hora Inicio</Translate>
              </span>
            </dt>
            <dd>{horarioMateriaEntity.horaInicio}</dd>
            <dt>
              <span id="horaFin">
                <Translate contentKey="tutoriasApp.horarioMateria.horaFin">Hora Fin</Translate>
              </span>
            </dt>
            <dd>{horarioMateriaEntity.horaFin}</dd>
            <dt>
              <span id="dia">
                <Translate contentKey="tutoriasApp.horarioMateria.dia">Dia</Translate>
              </span>
            </dt>
            <dd>{horarioMateriaEntity.dia}</dd>
            <dt>
              <Translate contentKey="tutoriasApp.horarioMateria.materia">Materia</Translate>
            </dt>
            <dd>{horarioMateriaEntity.materia ? horarioMateriaEntity.materia.id : ''}</dd>
            <dt>
              <Translate contentKey="tutoriasApp.horarioMateria.profesor">Profesor</Translate>
            </dt>
            <dd>{horarioMateriaEntity.profesor ? horarioMateriaEntity.profesor.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/horario-materia" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/horario-materia/${horarioMateriaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ horarioMateria }: IRootState) => ({
  horarioMateriaEntity: horarioMateria.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HorarioMateriaDetail);
