import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './profesor.reducer';
import { IProfesor } from 'app/shared/model/profesor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfesorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfesorDetail extends React.Component<IProfesorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { profesorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tutoriasApp.profesor.detail.title">Profesor</Translate> [<b>{profesorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="area">
                <Translate contentKey="tutoriasApp.profesor.area">Area</Translate>
              </span>
            </dt>
            <dd>{profesorEntity.area}</dd>
            <dt>
              <Translate contentKey="tutoriasApp.profesor.user">User</Translate>
            </dt>
            <dd>{profesorEntity.user ? profesorEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/profesor" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/profesor/${profesorEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ profesor }: IRootState) => ({
  profesorEntity: profesor.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfesorDetail);
