import { createAction } from 'typesafe-actions';
import { ProfileState } from 'shared/types/preload.interface';

const type: 'USER:SET_PROFILE' = 'USER:SET_PROFILE';

export default createAction(type)<ProfileState | null>();
