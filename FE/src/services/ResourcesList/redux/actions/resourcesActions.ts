import CreateAction, { CreateActionWithPayload } from '../../../CreateAction';
import {
  IAddResourcePayload,
  IChangeVinylNamePayload,
  IDeleteTrackActionPayload,
  IGetResourcesSuccess,
  IChangeTrackNamePayload,
} from './IResourcesActions';
import { RESOURCES_ACTION_TYPES } from './resourcesActionTypes';

export const getResourcesAction = CreateAction(RESOURCES_ACTION_TYPES.GET_RESOURCES);
export const getResourcesSuccessAction = CreateActionWithPayload<IGetResourcesSuccess>(
  RESOURCES_ACTION_TYPES.GET_RESOURCES_SUCCESS,
);
export const getResourcesFailedAction = CreateActionWithPayload<string>(RESOURCES_ACTION_TYPES.GET_RESOURCES_FAILED);

export const addResourceAction = CreateActionWithPayload<IAddResourcePayload>(RESOURCES_ACTION_TYPES.ADD_RESOURCE);
export const addResourceSuccessAction = CreateAction(RESOURCES_ACTION_TYPES.ADD_RESOURCE_SUCCESS);
export const addResourceFailedAction = CreateActionWithPayload<string>(RESOURCES_ACTION_TYPES.ADD_RESOURCE_FAILED);

export const deleteResourceAction = CreateActionWithPayload<number>(RESOURCES_ACTION_TYPES.DELETE_RESOURCE);
export const deleteResourceSuccessAction = CreateAction(RESOURCES_ACTION_TYPES.DELETE_RESOURCE_SUCCESS);
export const deleteResourceFailedAction = CreateActionWithPayload<string>(
  RESOURCES_ACTION_TYPES.DELETE_RESOURCE_FAILED,
);

export const deleteTrackResourceAction = CreateActionWithPayload<IDeleteTrackActionPayload>(
  RESOURCES_ACTION_TYPES.DELETE_TRACK_RESOURCE,
);
export const deleteTrackResourceSuccessAction = CreateAction(RESOURCES_ACTION_TYPES.DELETE_TRACK_RESOURCE_SUCCESS);
export const deleteTrackResourceFailedAction = CreateActionWithPayload<string>(
  RESOURCES_ACTION_TYPES.DELETE_TRACK_RESOURCE_FAILED,
);

export const changeVinylNameAction = CreateActionWithPayload<IChangeVinylNamePayload>(
  RESOURCES_ACTION_TYPES.CHANGE_VINYL_NAME,
);

export const changeVinylArtistAction = CreateActionWithPayload<IChangeVinylNamePayload>(
  RESOURCES_ACTION_TYPES.CHANGE_VINYL_ARTIST,
);

export const changeVinylAlbumTitleAction = CreateActionWithPayload<IChangeVinylNamePayload>(
  RESOURCES_ACTION_TYPES.CHANGE_VINYL_ALBUM_TITLE,
);

export const saveVinylChangesAction = CreateActionWithPayload<number>(RESOURCES_ACTION_TYPES.SAVE_VINYL_CHANGES);
export const saveVinylChangesSuccessAction = CreateAction(RESOURCES_ACTION_TYPES.SAVE_VINYL_CHANGES_SUCCESS);
export const saveVinylChangesFailedAction = CreateActionWithPayload<string>(
  RESOURCES_ACTION_TYPES.SAVE_VINYL_CHANGES_FAILED,
);

export const changeTrackValueAction = CreateActionWithPayload<IChangeTrackNamePayload>(
  RESOURCES_ACTION_TYPES.CHANGE_TRACK_NAME,
);
