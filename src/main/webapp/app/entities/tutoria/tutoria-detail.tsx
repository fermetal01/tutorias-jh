import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tutoria.reducer';
import { ITutoria } from 'app/shared/model/tutoria.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITutoriaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TutoriaDetail extends React.Component<ITutoriaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tutoriaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tutoriasApp.tutoria.detail.title">Tutoria</Translate> [<b>{tutoriaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="horaInicio">
                <Translate contentKey="tutoriasApp.tutoria.horaInicio">Hora Inicio</Translate>
              </span>
            </dt>
            <dd>{tutoriaEntity.horaInicio}</dd>
            <dt>
              <span id="horaFin">
                <Translate contentKey="tutoriasApp.tutoria.horaFin">Hora Fin</Translate>
              </span>
            </dt>
            <dd>{tutoriaEntity.horaFin}</dd>
            <dt>
              <span id="dia">
                <Translate contentKey="tutoriasApp.tutoria.dia">Dia</Translate>
              </span>
            </dt>
            <dd>{tutoriaEntity.dia}</dd>
            <dt>
              <span id="profesor">
                <Translate contentKey="tutoriasApp.tutoria.profesor">Profesor</Translate>
              </span>
            </dt>
            <dd>{tutoriaEntity.profesor}</dd>
            <dt>
              <span id="estudiante">
                <Translate contentKey="tutoriasApp.tutoria.estudiante">Estudiante</Translate>
              </span>
            </dt>
            <dd>{tutoriaEntity.estudiante}</dd>
            <dt>
              <span id="tomada">
                <Translate contentKey="tutoriasApp.tutoria.tomada">Tomada</Translate>
              </span>
            </dt>
            <dd>{tutoriaEntity.tomada ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="tutoriasApp.tutoria.materia">Materia</Translate>
            </dt>
            <dd>{tutoriaEntity.materia ? tutoriaEntity.materia.id : ''}</dd>
            <dt>
              <Translate contentKey="tutoriasApp.tutoria.estudiante">Estudiante</Translate>
            </dt>
            <dd>{tutoriaEntity.estudiante ? tutoriaEntity.estudiante.id : ''}</dd>
            <dt>
              <Translate contentKey="tutoriasApp.tutoria.profesor">Profesor</Translate>
            </dt>
            <dd>{tutoriaEntity.profesor ? tutoriaEntity.profesor.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/tutoria" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/tutoria/${tutoriaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tutoria }: IRootState) => ({
  tutoriaEntity: tutoria.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutoriaDetail);
