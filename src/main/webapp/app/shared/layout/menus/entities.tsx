import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/departamento">
      <Translate contentKey="global.menu.entities.departamento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/programa-academico">
      <Translate contentKey="global.menu.entities.programaAcademico" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/materia">
      <Translate contentKey="global.menu.entities.materia" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/horario-materia">
      <Translate contentKey="global.menu.entities.horarioMateria" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/tutoria">
      <Translate contentKey="global.menu.entities.tutoria" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/comentario">
      <Translate contentKey="global.menu.entities.comentario" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/estudiante">
      <Translate contentKey="global.menu.entities.estudiante" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/profesor">
      <Translate contentKey="global.menu.entities.profesor" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
