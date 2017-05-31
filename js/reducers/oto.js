
import type { Action } from '../actions/types';
import { SET_OTO } from '../actions/oto';

export type State = {
  markaId: string,
  seriId: string,
  vitesId: string,
  marka: string,
  seri: string,
  vites: string,
  yil: string,
}

const initialState = {
  markaId: '',
  seriId: '',
  vitesId: '',
  marka: '',
  seri: '',
  vites: '',
  yil: '',
}

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_OTO) {
    return {
      ...state,
      marka: action.payload.marka,
      seri: action.payload.seri,
      vites: action.payload.vites,
      markaId: action.payload.markaId,
      seriId: action.payload.seriId,
      vitesId: action.payload.vitesId,
      yil: action.payload.yil,
    };
  }
  return state;
}
