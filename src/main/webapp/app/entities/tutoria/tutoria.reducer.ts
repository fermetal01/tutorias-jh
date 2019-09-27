import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITutoria, defaultValue } from 'app/shared/model/tutoria.model';

export const ACTION_TYPES = {
  FETCH_TUTORIA_LIST: 'tutoria/FETCH_TUTORIA_LIST',
  FETCH_TUTORIA: 'tutoria/FETCH_TUTORIA',
  CREATE_TUTORIA: 'tutoria/CREATE_TUTORIA',
  UPDATE_TUTORIA: 'tutoria/UPDATE_TUTORIA',
  DELETE_TUTORIA: 'tutoria/DELETE_TUTORIA',
  RESET: 'tutoria/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITutoria>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TutoriaState = Readonly<typeof initialState>;

// Reducer

export default (state: TutoriaState = initialState, action): TutoriaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TUTORIA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TUTORIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TUTORIA):
    case REQUEST(ACTION_TYPES.UPDATE_TUTORIA):
    case REQUEST(ACTION_TYPES.DELETE_TUTORIA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TUTORIA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TUTORIA):
    case FAILURE(ACTION_TYPES.CREATE_TUTORIA):
    case FAILURE(ACTION_TYPES.UPDATE_TUTORIA):
    case FAILURE(ACTION_TYPES.DELETE_TUTORIA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TUTORIA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TUTORIA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TUTORIA):
    case SUCCESS(ACTION_TYPES.UPDATE_TUTORIA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TUTORIA):
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

const apiUrl = 'api/tutorias';

// Actions

export const getEntities: ICrudGetAllAction<ITutoria> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TUTORIA_LIST,
  payload: axios.get<ITutoria>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITutoria> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TUTORIA,
    payload: axios.get<ITutoria>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITutoria> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TUTORIA,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITutoria> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TUTORIA,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITutoria> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TUTORIA,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
