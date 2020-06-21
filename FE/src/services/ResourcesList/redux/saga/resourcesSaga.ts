import { AxiosResponse } from 'axios';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { RootState } from '../../../../config/rootReducer';
import { IActionPayload } from '../../../CreateAction';
import { IListResponse, IResource } from '../../interfaces/IResourcesListService';
import { ResourcesListService } from '../../ResourcesListService';
import { IAddResourcePayload, IDeleteTrackActionPayload } from '../actions/IResourcesActions';
import {
  addResourceFailedAction,
  addResourceSuccessAction,
  deleteResourceFailedAction,
  deleteResourceSuccessAction,
  deleteTrackResourceFailedAction,
  deleteTrackResourceSuccessAction,
  getResourcesFailedAction,
  getResourcesSuccessAction,
  saveVinylChangesFailedAction,
  saveVinylChangesSuccessAction,
} from '../actions/resourcesActions';
import { RESOURCES_ACTION_TYPES } from '../actions/resourcesActionTypes';
import { resourceByIdSelector } from '../selectors/resourcesListSelectors';

export function* getResourcesSaga() {
  try {
    const { data } = (yield call(ResourcesListService.getResourcesList)) as AxiosResponse<IListResponse>;
    // INFO: just to make loader on home visible
    yield delay(2000);
    yield put(getResourcesSuccessAction({ data }));
  } catch (error) {
    console.error(error);
    yield put(getResourcesFailedAction(error.message));
  }
}

export function* addResourceSaga(action: IActionPayload<IAddResourcePayload, RESOURCES_ACTION_TYPES.ADD_RESOURCE>) {
  try {
    const { payload } = action;
    yield call(ResourcesListService.createResource, payload);
    // INFO: just to make loader on home visible
    yield delay(2000);
    yield put(addResourceSuccessAction());
    yield getResourcesSaga();
  } catch (error) {
    console.error(error);
    yield put(addResourceFailedAction(error.message));
  }
}

export function* deleteResourceSaga(action: IActionPayload<number, RESOURCES_ACTION_TYPES.DELETE_RESOURCE>) {
  try {
    const { payload } = action;
    yield call(ResourcesListService.deleteResource, payload);
    // INFO: just to make loader on home visible
    yield delay(2000);
    yield put(deleteResourceSuccessAction());
    yield getResourcesSaga();
  } catch (error) {
    console.error(error);
    yield put(deleteResourceFailedAction(error.message));
  }
}

export function* deleteTrackResourceSaga(
  action: IActionPayload<IDeleteTrackActionPayload, RESOURCES_ACTION_TYPES.DELETE_TRACK_RESOURCE>,
) {
  try {
    const { vinylId, trackId } = action.payload;
    yield call(ResourcesListService.deleteTrackResource, vinylId, trackId);
    // INFO: just to make loader on home visible
    yield delay(2000);
    yield put(deleteTrackResourceSuccessAction());
    yield getResourcesSaga();
  } catch (error) {
    console.error(error);
    yield put(deleteTrackResourceFailedAction(error.message));
  }
}

export function* saveResourceChangesSaga(action: IActionPayload<number, RESOURCES_ACTION_TYPES.SAVE_VINYL_CHANGES>) {
  try {
    const { payload } = action;
    const vinylToUpdate = (yield select((state: RootState) => resourceByIdSelector(state, payload))) as IResource;
    yield call(ResourcesListService.updateResource, vinylToUpdate, payload);
    // INFO: just to make loader on home visible
    yield delay(2000);
    yield put(saveVinylChangesSuccessAction());
    yield getResourcesSaga();
  } catch (error) {
    console.error(error);
    yield put(saveVinylChangesFailedAction(error.message));
  }
}

export function* watchResourcesEvents() {
  yield takeLatest(RESOURCES_ACTION_TYPES.GET_RESOURCES, getResourcesSaga);
  yield takeLatest(RESOURCES_ACTION_TYPES.ADD_RESOURCE, addResourceSaga);
  yield takeLatest(RESOURCES_ACTION_TYPES.DELETE_RESOURCE, deleteResourceSaga);
  yield takeLatest(RESOURCES_ACTION_TYPES.DELETE_TRACK_RESOURCE, deleteTrackResourceSaga);
  yield takeLatest(RESOURCES_ACTION_TYPES.SAVE_VINYL_CHANGES, saveResourceChangesSaga);
}
