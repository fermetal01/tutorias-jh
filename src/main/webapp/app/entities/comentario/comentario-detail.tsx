import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './comentario.reducer';
import { IComentario } from 'app/shared/model/comentario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IComentarioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ComentarioDetail extends React.Component<IComentarioDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { comentarioEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tutoriasApp.comentario.detail.title">Comentario</Translate> [<b>{comentarioEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="comentarioInicial">
                <Translate contentKey="tutoriasApp.comentario.comentarioInicial">Comentario Inicial</Translate>
              </span>
            </dt>
            <dd>{comentarioEntity.comentarioInicial}</dd>
            <dt>
              <span id="padre">
                <Translate contentKey="tutoriasApp.comentario.padre">Padre</Translate>
              </span>
            </dt>
            <dd>{comentarioEntity.padre}</dd>
            <dt>
              <span id="descripcion">
                <Translate contentKey="tutoriasApp.comentario.descripcion">Descripcion</Translate>
              </span>
            </dt>
            <dd>{comentarioEntity.descripcion}</dd>
            <dt>
              <span id="usuario">
                <Translate contentKey="tutoriasApp.comentario.usuario">Usuario</Translate>
              </span>
            </dt>
            <dd>{comentarioEntity.usuario}</dd>
            <dt>
              <Translate contentKey="tutoriasApp.comentario.tutoria">Tutoria</Translate>
            </dt>
            <dd>{comentarioEntity.tutoria ? comentarioEntity.tutoria.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/comentario" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/comentario/${comentarioEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ comentario }: IRootState) => ({
  comentarioEntity: comentario.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComentarioDetail);
