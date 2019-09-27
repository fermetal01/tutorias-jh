import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './programa-academico.reducer';
import { IProgramaAcademico } from 'app/shared/model/programa-academico.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProgramaAcademicoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProgramaAcademicoDetail extends React.Component<IProgramaAcademicoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { programaAcademicoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tutoriasApp.programaAcademico.detail.title">ProgramaAcademico</Translate> [
            <b>{programaAcademicoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="codigo">
                <Translate contentKey="tutoriasApp.programaAcademico.codigo">Codigo</Translate>
              </span>
            </dt>
            <dd>{programaAcademicoEntity.codigo}</dd>
            <dt>
              <span id="nombre">
                <Translate contentKey="tutoriasApp.programaAcademico.nombre">Nombre</Translate>
              </span>
            </dt>
            <dd>{programaAcademicoEntity.nombre}</dd>
            <dt>
              <span id="url">
                <Translate contentKey="tutoriasApp.programaAcademico.url">Url</Translate>
              </span>
            </dt>
            <dd>{programaAcademicoEntity.url}</dd>
            <dt>
              <span id="correo">
                <Translate contentKey="tutoriasApp.programaAcademico.correo">Correo</Translate>
              </span>
            </dt>
            <dd>{programaAcademicoEntity.correo}</dd>
            <dt>
              <Translate contentKey="tutoriasApp.programaAcademico.departamento">Departamento</Translate>
            </dt>
            <dd>{programaAcademicoEntity.departamento ? programaAcademicoEntity.departamento.id : ''}</dd>
            <dt>
              <Translate contentKey="tutoriasApp.programaAcademico.materia">Materia</Translate>
            </dt>
            <dd>
              {programaAcademicoEntity.materias
                ? programaAcademicoEntity.materias.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === programaAcademicoEntity.materias.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="tutoriasApp.programaAcademico.estudiante">Estudiante</Translate>
            </dt>
            <dd>{programaAcademicoEntity.estudiante ? programaAcademicoEntity.estudiante.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/programa-academico" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/programa-academico/${programaAcademicoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ programaAcademico }: IRootState) => ({
  programaAcademicoEntity: programaAcademico.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramaAcademicoDetail);
