import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProfesor } from 'app/shared/model/profesor.model';
import { getEntities as getProfesors } from 'app/entities/profesor/profesor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './departamento.reducer';
import { IDepartamento } from 'app/shared/model/departamento.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDepartamentoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDepartamentoUpdateState {
  isNew: boolean;
  profesorId: string;
}

export class DepartamentoUpdate extends React.Component<IDepartamentoUpdateProps, IDepartamentoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.getProfesors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { departamentoEntity } = this.props;
      const entity = {
        ...departamentoEntity,
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
    this.props.history.push('/entity/departamento');
  };

  render() {
    const { departamentoEntity, profesors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tutoriasApp.departamento.home.createOrEditLabel">
              <Translate contentKey="tutoriasApp.departamento.home.createOrEditLabel">Create or edit a Departamento</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : departamentoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="departamento-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="departamento-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nombreLabel" for="departamento-nombre">
                    <Translate contentKey="tutoriasApp.departamento.nombre">Nombre</Translate>
                  </Label>
                  <AvField id="departamento-nombre" type="text" name="nombre" />
                </AvGroup>
                <AvGroup>
                  <Label id="decanoLabel" for="departamento-decano">
                    <Translate contentKey="tutoriasApp.departamento.decano">Decano</Translate>
                  </Label>
                  <AvField id="departamento-decano" type="text" name="decano" />
                </AvGroup>
                <AvGroup>
                  <Label for="departamento-profesor">
                    <Translate contentKey="tutoriasApp.departamento.profesor">Profesor</Translate>
                  </Label>
                  <AvInput id="departamento-profesor" type="select" className="form-control" name="profesor.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/departamento" replace color="info">
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
  profesors: storeState.profesor.entities,
  departamentoEntity: storeState.departamento.entity,
  loading: storeState.departamento.loading,
  updating: storeState.departamento.updating,
  updateSuccess: storeState.departamento.updateSuccess
});

const mapDispatchToProps = {
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
)(DepartamentoUpdate);
