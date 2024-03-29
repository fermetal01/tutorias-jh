import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProgramaAcademico, defaultValue } from 'app/shared/model/programa-academico.model';

export const ACTION_TYPES = {
  FETCH_PROGRAMAACADEMICO_LIST: 'programaAcademico/FETCH_PROGRAMAACADEMICO_LIST',
  FETCH_PROGRAMAACADEMICO: 'programaAcademico/FETCH_PROGRAMAACADEMICO',
  CREATE_PROGRAMAACADEMICO: 'programaAcademico/CREATE_PROGRAMAACADEMICO',
  UPDATE_PROGRAMAACADEMICO: 'programaAcademico/UPDATE_PROGRAMAACADEMICO',
  DELETE_PROGRAMAACADEMICO: 'programaAcademico/DELETE_PROGRAMAACADEMICO',
  RESET: 'programaAcademico/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProgramaAcademico>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProgramaAcademicoState = Readonly<typeof initialState>;

// Reducer

export default (state: ProgramaAcademicoState = initialState, action): ProgramaAcademicoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROGRAMAACADEMICO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROGRAMAACADEMICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROGRAMAACADEMICO):
    case REQUEST(ACTION_TYPES.UPDATE_PROGRAMAACADEMICO):
    case REQUEST(ACTION_TYPES.DELETE_PROGRAMAACADEMICO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROGRAMAACADEMICO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROGRAMAACADEMICO):
    case FAILURE(ACTION_TYPES.CREATE_PROGRAMAACADEMICO):
    case FAILURE(ACTION_TYPES.UPDATE_PROGRAMAACADEMICO):
    case FAILURE(ACTION_TYPES.DELETE_PROGRAMAACADEMICO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROGRAMAACADEMICO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROGRAMAACADEMICO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROGRAMAACADEMICO):
    case SUCCESS(ACTION_TYPES.UPDATE_PROGRAMAACADEMICO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROGRAMAACADEMICO):
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

const apiUrl = 'api/programa-academicos';

// Actions

export const getEntities: ICrudGetAllAction<IProgramaAcademico> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROGRAMAACADEMICO_LIST,
  payload: axios.get<IProgramaAcademico>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProgramaAcademico> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROGRAMAACADEMICO,
    payload: axios.get<IProgramaAcademico>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IProgramaAcademico> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROGRAMAACADEMICO,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProgramaAcademico> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROGRAMAACADEMICO,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProgramaAcademico> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROGRAMAACADEMICO,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
