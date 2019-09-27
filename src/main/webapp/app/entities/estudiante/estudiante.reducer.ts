import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEstudiante, defaultValue } from 'app/shared/model/estudiante.model';

export const ACTION_TYPES = {
  FETCH_ESTUDIANTE_LIST: 'estudiante/FETCH_ESTUDIANTE_LIST',
  FETCH_ESTUDIANTE: 'estudiante/FETCH_ESTUDIANTE',
  CREATE_ESTUDIANTE: 'estudiante/CREATE_ESTUDIANTE',
  UPDATE_ESTUDIANTE: 'estudiante/UPDATE_ESTUDIANTE',
  DELETE_ESTUDIANTE: 'estudiante/DELETE_ESTUDIANTE',
  RESET: 'estudiante/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEstudiante>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type EstudianteState = Readonly<typeof initialState>;

// Reducer

export default (state: EstudianteState = initialState, action): EstudianteState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ESTUDIANTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESTUDIANTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ESTUDIANTE):
    case REQUEST(ACTION_TYPES.UPDATE_ESTUDIANTE):
    case REQUEST(ACTION_TYPES.DELETE_ESTUDIANTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ESTUDIANTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESTUDIANTE):
    case FAILURE(ACTION_TYPES.CREATE_ESTUDIANTE):
    case FAILURE(ACTION_TYPES.UPDATE_ESTUDIANTE):
    case FAILURE(ACTION_TYPES.DELETE_ESTUDIANTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESTUDIANTE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESTUDIANTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESTUDIANTE):
    case SUCCESS(ACTION_TYPES.UPDATE_ESTUDIANTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESTUDIANTE):
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

const apiUrl = 'api/estudiantes';

// Actions

export const getEntities: ICrudGetAllAction<IEstudiante> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ESTUDIANTE_LIST,
  payload: axios.get<IEstudiante>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IEstudiante> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESTUDIANTE,
    payload: axios.get<IEstudiante>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEstudiante> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESTUDIANTE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEstudiante> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESTUDIANTE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEstudiante> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESTUDIANTE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
