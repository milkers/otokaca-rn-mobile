
import type { Action } from '../actions/types';
import { SET_OTO } from '../actions/oto';

export type State = {
  marka: string,
  seri: string,
  vites: string,
}

const initialState = {
  marka: '',
  seri: '',
  vites: '',
}

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_OTO) {
    return {
      ...state,
      marka: action.payload.marka,
      seri: action.payload.seri,
      vites: action.payload.vites,
    };
  }
  return state;
}
