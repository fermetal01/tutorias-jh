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
import { IProfesor } from 'app/shared/model/profesor.model';
import { getEntities as getProfesors } from 'app/entities/profesor/profesor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './horario-materia.reducer';
import { IHorarioMateria } from 'app/shared/model/horario-materia.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHorarioMateriaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IHorarioMateriaUpdateState {
  isNew: boolean;
  materiaId: string;
  profesorId: string;
}

export class HorarioMateriaUpdate extends React.Component<IHorarioMateriaUpdateProps, IHorarioMateriaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      materiaId: '0',
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
    this.props.getProfesors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { horarioMateriaEntity } = this.props;
      const entity = {
        ...horarioMateriaEntity,
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
    this.props.history.push('/entity/horario-materia');
  };

  render() {
    const { horarioMateriaEntity, materias, profesors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tutoriasApp.horarioMateria.home.createOrEditLabel">
              <Translate contentKey="tutoriasApp.horarioMateria.home.createOrEditLabel">Create or edit a HorarioMateria</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : horarioMateriaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="horario-materia-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="horario-materia-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="profesorLabel" for="horario-materia-profesor">
                    <Translate contentKey="tutoriasApp.horarioMateria.profesor">Profesor</Translate>
                  </Label>
                  <AvField id="horario-materia-profesor" type="text" name="profesor" />
                </AvGroup>
                <AvGroup>
                  <Label id="horaInicioLabel" for="horario-materia-horaInicio">
                    <Translate contentKey="tutoriasApp.horarioMateria.horaInicio">Hora Inicio</Translate>
                  </Label>
                  <AvField id="horario-materia-horaInicio" type="text" name="horaInicio" />
                </AvGroup>
                <AvGroup>
                  <Label id="horaFinLabel" for="horario-materia-horaFin">
                    <Translate contentKey="tutoriasApp.horarioMateria.horaFin">Hora Fin</Translate>
                  </Label>
                  <AvField id="horario-materia-horaFin" type="text" name="horaFin" />
                </AvGroup>
                <AvGroup>
                  <Label id="diaLabel" for="horario-materia-dia">
                    <Translate contentKey="tutoriasApp.horarioMateria.dia">Dia</Translate>
                  </Label>
                  <AvInput
                    id="horario-materia-dia"
                    type="select"
                    className="form-control"
                    name="dia"
                    value={(!isNew && horarioMateriaEntity.dia) || 'LUNES'}
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
                  <Label for="horario-materia-materia">
                    <Translate contentKey="tutoriasApp.horarioMateria.materia">Materia</Translate>
                  </Label>
                  <AvInput id="horario-materia-materia" type="select" className="form-control" name="materia.id">
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
                  <Label for="horario-materia-profesor">
                    <Translate contentKey="tutoriasApp.horarioMateria.profesor">Profesor</Translate>
                  </Label>
                  <AvInput id="horario-materia-profesor" type="select" className="form-control" name="profesor.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/horario-materia" replace color="info">
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
  profesors: storeState.profesor.entities,
  horarioMateriaEntity: storeState.horarioMateria.entity,
  loading: storeState.horarioMateria.loading,
  updating: storeState.horarioMateria.updating,
  updateSuccess: storeState.horarioMateria.updateSuccess
});

const mapDispatchToProps = {
  getMaterias,
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
)(HorarioMateriaUpdate);
