import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDepartamento } from 'app/shared/model/departamento.model';
import { getEntities as getDepartamentos } from 'app/entities/departamento/departamento.reducer';
import { IMateria } from 'app/shared/model/materia.model';
import { getEntities as getMaterias } from 'app/entities/materia/materia.reducer';
import { IEstudiante } from 'app/shared/model/estudiante.model';
import { getEntities as getEstudiantes } from 'app/entities/estudiante/estudiante.reducer';
import { getEntity, updateEntity, createEntity, reset } from './programa-academico.reducer';
import { IProgramaAcademico } from 'app/shared/model/programa-academico.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProgramaAcademicoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProgramaAcademicoUpdateState {
  isNew: boolean;
  idsmateria: any[];
  departamentoId: string;
  estudianteId: string;
}

export class ProgramaAcademicoUpdate extends React.Component<IProgramaAcademicoUpdateProps, IProgramaAcademicoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsmateria: [],
      departamentoId: '0',
      estudianteId: '0',
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

    this.props.getDepartamentos();
    this.props.getMaterias();
    this.props.getEstudiantes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { programaAcademicoEntity } = this.props;
      const entity = {
        ...programaAcademicoEntity,
        ...values,
        materias: mapIdList(values.materias)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/programa-academico');
  };

  render() {
    const { programaAcademicoEntity, departamentos, materias, estudiantes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tutoriasApp.programaAcademico.home.createOrEditLabel">
              <Translate contentKey="tutoriasApp.programaAcademico.home.createOrEditLabel">Create or edit a ProgramaAcademico</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : programaAcademicoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="programa-academico-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="programa-academico-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codigoLabel" for="programa-academico-codigo">
                    <Translate contentKey="tutoriasApp.programaAcademico.codigo">Codigo</Translate>
                  </Label>
                  <AvField id="programa-academico-codigo" type="text" name="codigo" />
                </AvGroup>
                <AvGroup>
                  <Label id="nombreLabel" for="programa-academico-nombre">
                    <Translate contentKey="tutoriasApp.programaAcademico.nombre">Nombre</Translate>
                  </Label>
                  <AvField id="programa-academico-nombre" type="text" name="nombre" />
                </AvGroup>
                <AvGroup>
                  <Label id="urlLabel" for="programa-academico-url">
                    <Translate contentKey="tutoriasApp.programaAcademico.url">Url</Translate>
                  </Label>
                  <AvField id="programa-academico-url" type="text" name="url" />
                </AvGroup>
                <AvGroup>
                  <Label id="correoLabel" for="programa-academico-correo">
                    <Translate contentKey="tutoriasApp.programaAcademico.correo">Correo</Translate>
                  </Label>
                  <AvField id="programa-academico-correo" type="text" name="correo" />
                </AvGroup>
                <AvGroup>
                  <Label for="programa-academico-departamento">
                    <Translate contentKey="tutoriasApp.programaAcademico.departamento">Departamento</Translate>
                  </Label>
                  <AvInput id="programa-academico-departamento" type="select" className="form-control" name="departamento.id">
                    <option value="" key="0" />
                    {departamentos
                      ? departamentos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="programa-academico-materia">
                    <Translate contentKey="tutoriasApp.programaAcademico.materia">Materia</Translate>
                  </Label>
                  <AvInput
                    id="programa-academico-materia"
                    type="select"
                    multiple
                    className="form-control"
                    name="materias"
                    value={programaAcademicoEntity.materias && programaAcademicoEntity.materias.map(e => e.id)}
                  >
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
                  <Label for="programa-academico-estudiante">
                    <Translate contentKey="tutoriasApp.programaAcademico.estudiante">Estudiante</Translate>
                  </Label>
                  <AvInput id="programa-academico-estudiante" type="select" className="form-control" name="estudiante.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/programa-academico" replace color="info">
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
  departamentos: storeState.departamento.entities,
  materias: storeState.materia.entities,
  estudiantes: storeState.estudiante.entities,
  programaAcademicoEntity: storeState.programaAcademico.entity,
  loading: storeState.programaAcademico.loading,
  updating: storeState.programaAcademico.updating,
  updateSuccess: storeState.programaAcademico.updateSuccess
});

const mapDispatchToProps = {
  getDepartamentos,
  getMaterias,
  getEstudiantes,
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
)(ProgramaAcademicoUpdate);
