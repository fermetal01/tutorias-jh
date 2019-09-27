import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITutoria } from 'app/shared/model/tutoria.model';
import { getEntities as getTutorias } from 'app/entities/tutoria/tutoria.reducer';
import { getEntity, updateEntity, createEntity, reset } from './comentario.reducer';
import { IComentario } from 'app/shared/model/comentario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IComentarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IComentarioUpdateState {
  isNew: boolean;
  tutoriaId: string;
}

export class ComentarioUpdate extends React.Component<IComentarioUpdateProps, IComentarioUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      tutoriaId: '0',
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

    this.props.getTutorias();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { comentarioEntity } = this.props;
      const entity = {
        ...comentarioEntity,
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
    this.props.history.push('/entity/comentario');
  };

  render() {
    const { comentarioEntity, tutorias, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tutoriasApp.comentario.home.createOrEditLabel">
              <Translate contentKey="tutoriasApp.comentario.home.createOrEditLabel">Create or edit a Comentario</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : comentarioEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="comentario-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="comentario-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="comentarioInicialLabel" for="comentario-comentarioInicial">
                    <Translate contentKey="tutoriasApp.comentario.comentarioInicial">Comentario Inicial</Translate>
                  </Label>
                  <AvField id="comentario-comentarioInicial" type="text" name="comentarioInicial" />
                </AvGroup>
                <AvGroup>
                  <Label id="padreLabel" for="comentario-padre">
                    <Translate contentKey="tutoriasApp.comentario.padre">Padre</Translate>
                  </Label>
                  <AvField id="comentario-padre" type="text" name="padre" />
                </AvGroup>
                <AvGroup>
                  <Label id="descripcionLabel" for="comentario-descripcion">
                    <Translate contentKey="tutoriasApp.comentario.descripcion">Descripcion</Translate>
                  </Label>
                  <AvField id="comentario-descripcion" type="text" name="descripcion" />
                </AvGroup>
                <AvGroup>
                  <Label id="usuarioLabel" for="comentario-usuario">
                    <Translate contentKey="tutoriasApp.comentario.usuario">Usuario</Translate>
                  </Label>
                  <AvField id="comentario-usuario" type="text" name="usuario" />
                </AvGroup>
                <AvGroup>
                  <Label for="comentario-tutoria">
                    <Translate contentKey="tutoriasApp.comentario.tutoria">Tutoria</Translate>
                  </Label>
                  <AvInput id="comentario-tutoria" type="select" className="form-control" name="tutoria.id">
                    <option value="" key="0" />
                    {tutorias
                      ? tutorias.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/comentario" replace color="info">
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
  tutorias: storeState.tutoria.entities,
  comentarioEntity: storeState.comentario.entity,
  loading: storeState.comentario.loading,
  updating: storeState.comentario.updating,
  updateSuccess: storeState.comentario.updateSuccess
});

const mapDispatchToProps = {
  getTutorias,
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
)(ComentarioUpdate);
