import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IHorarioMateria, defaultValue } from 'app/shared/model/horario-materia.model';

export const ACTION_TYPES = {
  FETCH_HORARIOMATERIA_LIST: 'horarioMateria/FETCH_HORARIOMATERIA_LIST',
  FETCH_HORARIOMATERIA: 'horarioMateria/FETCH_HORARIOMATERIA',
  CREATE_HORARIOMATERIA: 'horarioMateria/CREATE_HORARIOMATERIA',
  UPDATE_HORARIOMATERIA: 'horarioMateria/UPDATE_HORARIOMATERIA',
  DELETE_HORARIOMATERIA: 'horarioMateria/DELETE_HORARIOMATERIA',
  RESET: 'horarioMateria/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHorarioMateria>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type HorarioMateriaState = Readonly<typeof initialState>;

// Reducer

export default (state: HorarioMateriaState = initialState, action): HorarioMateriaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_HORARIOMATERIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HORARIOMATERIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HORARIOMATERIA):
    case REQUEST(ACTION_TYPES.UPDATE_HORARIOMATERIA):
    case REQUEST(ACTION_TYPES.DELETE_HORARIOMATERIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_HORARIOMATERIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HORARIOMATERIA):
    case FAILURE(ACTION_TYPES.CREATE_HORARIOMATERIA):
    case FAILURE(ACTION_TYPES.UPDATE_HORARIOMATERIA):
    case FAILURE(ACTION_TYPES.DELETE_HORARIOMATERIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_HORARIOMATERIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HORARIOMATERIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HORARIOMATERIA):
    case SUCCESS(ACTION_TYPES.UPDATE_HORARIOMATERIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HORARIOMATERIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/horario-materias';

// Actions

export const getEntities: ICrudGetAllAction<IHorarioMateria> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_HORARIOMATERIA_LIST,
  payload: axios.get<IHorarioMateria>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IHorarioMateria> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HORARIOMATERIA,
    payload: axios.get<IHorarioMateria>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHorarioMateria> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HORARIOMATERIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHorarioMateria> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HORARIOMATERIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHorarioMateria> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HORARIOMATERIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
