import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IComentario, defaultValue } from 'app/shared/model/comentario.model';

export const ACTION_TYPES = {
  FETCH_COMENTARIO_LIST: 'comentario/FETCH_COMENTARIO_LIST',
  FETCH_COMENTARIO: 'comentario/FETCH_COMENTARIO',
  CREATE_COMENTARIO: 'comentario/CREATE_COMENTARIO',
  UPDATE_COMENTARIO: 'comentario/UPDATE_COMENTARIO',
  DELETE_COMENTARIO: 'comentario/DELETE_COMENTARIO',
  RESET: 'comentario/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IComentario>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ComentarioState = Readonly<typeof initialState>;

// Reducer

export default (state: ComentarioState = initialState, action): ComentarioState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMENTARIO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMENTARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COMENTARIO):
    case REQUEST(ACTION_TYPES.UPDATE_COMENTARIO):
    case REQUEST(ACTION_TYPES.DELETE_COMENTARIO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COMENTARIO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMENTARIO):
    case FAILURE(ACTION_TYPES.CREATE_COMENTARIO):
    case FAILURE(ACTION_TYPES.UPDATE_COMENTARIO):
    case FAILURE(ACTION_TYPES.DELETE_COMENTARIO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMENTARIO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMENTARIO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMENTARIO):
    case SUCCESS(ACTION_TYPES.UPDATE_COMENTARIO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMENTARIO):
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

const apiUrl = 'api/comentarios';

// Actions

export const getEntities: ICrudGetAllAction<IComentario> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMENTARIO_LIST,
  payload: axios.get<IComentario>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IComentario> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMENTARIO,
    payload: axios.get<IComentario>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IComentario> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMENTARIO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IComentario> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMENTARIO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IComentario> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMENTARIO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
