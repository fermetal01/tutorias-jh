import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMateria } from 'app/shared/model/materia.model';
import { getEntities as getMaterias } from 'app/entities/materia/materia.reducer';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { getEntities as getEstudiantes } from 'app/entities/estudiante/estudiante.reducer';
import { IProfesor } from 'app/shared/model/profesor.model';
import { getEntities as getProfesors } from 'app/entities/profesor/profesor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tutoria.reducer';
import { ITutoria } from 'app/shared/model/tutoria.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITutoriaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITutoriaUpdateState {
  isNew: boolean;
  materiaId: string;
  estudianteId: string;
  profesorId: string;
}

export class TutoriaUpdate extends React.Component<ITutoriaUpdateProps, ITutoriaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      materiaId: '0',
      estudianteId: '0',
      profesorId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getMaterias();
    this.props.getEstudiantes();
    this.props.getProfesors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { tutoriaEntity } = this.props;
      const entity = {
        ...tutoriaEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/tutoria');
  };

  render() {
    const { tutoriaEntity, materias, estudiantes, profesors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tutoriasApp.tutoria.home.createOrEditLabel">
              <Translate contentKey="tutoriasApp.tutoria.home.createOrEditLabel">Create or edit a Tutoria</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tutoriaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="tutoria-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="tutoria-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="horaInicioLabel" for="tutoria-horaInicio">
                    <Translate contentKey="tutoriasApp.tutoria.horaInicio">Hora Inicio</Translate>
                  </Label>
                  <AvField id="tutoria-horaInicio" type="text" name="horaInicio" />
                </AvGroup>
                <AvGroup>
                  <Label id="horaFinLabel" for="tutoria-horaFin">
                    <Translate contentKey="tutoriasApp.tutoria.horaFin">Hora Fin</Translate>
                  </Label>
                  <AvField id="tutoria-horaFin" type="text" name="horaFin" />
                </AvGroup>
                <AvGroup>
                  <Label id="diaLabel" for="tutoria-dia">
                    <Translate contentKey="tutoriasApp.tutoria.dia">Dia</Translate>
                  </Label>
                  <AvInput
                    id="tutoria-dia"
                    type="select"
                    className="form-control"
                    name="dia"
                    value={(!isNew && tutoriaEntity.dia) || 'LUNES'}
                  >
                    <option value="LUNES">{translate('tutoriasApp.Dia.LUNES')}</option>
                    <option value="MARTES">{translate('tutoriasApp.Dia.MARTES')}</option>
                    <option value="MIERCOLES">{translate('tutoriasApp.Dia.MIERCOLES')}</option>
                    <option value="JUEVES">{translate('tutoriasApp.Dia.JUEVES')}</option>
                    <option value="VIERNES">{translate('tutoriasApp.Dia.VIERNES')}</option>
                    <option value="SABADO">{translate('tutoriasApp.Dia.SABADO')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="profesorLabel" for="tutoria-profesor">
                    <Translate contentKey="tutoriasApp.tutoria.profesor">Profesor</Translate>
                  </Label>
                  <AvField id="tutoria-profesor" type="text" name="profesor" />
                </AvGroup>
                <AvGroup>
                  <Label id="estudianteLabel" for="tutoria-estudiante">
                    <Translate contentKey="tutoriasApp.tutoria.estudiante">Estudiante</Translate>
                  </Label>
                  <AvField id="tutoria-estudiante" type="text" name="estudiante" />
                </AvGroup>
                <AvGroup>
                  <Label id="tomadaLabel" check>
                    <AvInput id="tutoria-tomada" type="checkbox" className="form-control" name="tomada" />
                    <Translate contentKey="tutoriasApp.tutoria.tomada">Tomada</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="tutoria-materia">
                    <Translate contentKey="tutoriasApp.tutoria.materia">Materia</Translate>
                  </Label>
                  <AvInput id="tutoria-materia" type="select" className="form-control" name="materia.id">
                    <option value="" key="0" />
                    {materias
                      ? materias.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="tutoria-estudiante">
                    <Translate contentKey="tutoriasApp.tutoria.estudiante">Estudiante</Translate>
                  </Label>
                  <AvInput id="tutoria-estudiante" type="select" className="form-control" name="estudiante.id">
                    <option value="" key="0" />
                    {estudiantes
                      ? estudiantes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="tutoria-profesor">
                    <Translate contentKey="tutoriasApp.tutoria.profesor">Profesor</Translate>
                  </Label>
                  <AvInput id="tutoria-profesor" type="select" className="form-control" name="profesor.id">
                    <option value="" key="0" />
                    {profesors
                      ? profesors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/tutoria" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  materias: storeState.materia.entities,
  estudiantes: storeState.estudiante.entities,
  profesors: storeState.profesor.entities,
  tutoriaEntity: storeState.tutoria.entity,
  loading: storeState.tutoria.loading,
  updating: storeState.tutoria.updating,
  updateSuccess: storeState.tutoria.updateSuccess
});

const mapDispatchToProps = {
  getMaterias,
  getEstudiantes,
  getProfesors,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutoriaUpdate);
