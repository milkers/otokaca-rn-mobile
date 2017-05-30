
import type { Action } from './types';

export const SET_OTO = 'SET_OTO';

export function setOto(oto:any):Action {
  return {
    type: SET_OTO,
    payload: oto,
  };
}
