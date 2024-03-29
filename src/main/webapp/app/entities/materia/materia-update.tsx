import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './materia.reducer';
import { IMateria } from 'app/shared/model/materia.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMateriaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMateriaUpdateState {
  isNew: boolean;
}

export class MateriaUpdate extends React.Component<IMateriaUpdateProps, IMateriaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { materiaEntity } = this.props;
      const entity = {
        ...materiaEntity,
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
    this.props.history.push('/entity/materia');
  };

  render() {
    const { materiaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tutoriasApp.materia.home.createOrEditLabel">
              <Translate contentKey="tutoriasApp.materia.home.createOrEditLabel">Create or edit a Materia</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : materiaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="materia-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="materia-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codigoLabel" for="materia-codigo">
                    <Translate contentKey="tutoriasApp.materia.codigo">Codigo</Translate>
                  </Label>
                  <AvField id="materia-codigo" type="text" name="codigo" />
                </AvGroup>
                <AvGroup>
                  <Label id="nombreLabel" for="materia-nombre">
                    <Translate contentKey="tutoriasApp.materia.nombre">Nombre</Translate>
                  </Label>
                  <AvField id="materia-nombre" type="text" name="nombre" />
                </AvGroup>
                <AvGroup>
                  <Label id="creditosLabel" for="materia-creditos">
                    <Translate contentKey="tutoriasApp.materia.creditos">Creditos</Translate>
                  </Label>
                  <AvField id="materia-creditos" type="string" className="form-control" name="creditos" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/materia" replace color="info">
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
  materiaEntity: storeState.materia.entity,
  loading: storeState.materia.loading,
  updating: storeState.materia.updating,
  updateSuccess: storeState.materia.updateSuccess
});

const mapDispatchToProps = {
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
)(MateriaUpdate);
