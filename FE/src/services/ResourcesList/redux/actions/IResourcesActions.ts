import { IAction, IActionPayload } from '../../../CreateAction';
import { IListResponse } from '../../interfaces/IResourcesListService';
import { RESOURCES_ACTION_TYPES } from './resourcesActionTypes';

export type IResourcesActions =
  | IActionPayload<IGetResourcesSuccess, RESOURCES_ACTION_TYPES.GET_RESOURCES_SUCCESS>
  | IActionPayload<string, RESOURCES_ACTION_TYPES.GET_RESOURCES_FAILED>
  | IAction<RESOURCES_ACTION_TYPES.GET_RESOURCES>
  | IActionPayload<IAddResourcePayload, RESOURCES_ACTION_TYPES.ADD_RESOURCE>
  | IAction<RESOURCES_ACTION_TYPES.ADD_RESOURCE_SUCCESS>
  | IActionPayload<string, RESOURCES_ACTION_TYPES.ADD_RESOURCE_FAILED>
  | IActionPayload<number, RESOURCES_ACTION_TYPES.DELETE_RESOURCE>
  | IAction<RESOURCES_ACTION_TYPES.DELETE_RESOURCE_SUCCESS>
  | IActionPayload<string, RESOURCES_ACTION_TYPES.DELETE_RESOURCE_FAILED>
  | IActionPayload<number, RESOURCES_ACTION_TYPES.DELETE_TRACK_RESOURCE>
  | IAction<RESOURCES_ACTION_TYPES.DELETE_TRACK_RESOURCE_SUCCESS>
  | IActionPayload<string, RESOURCES_ACTION_TYPES.DELETE_TRACK_RESOURCE_FAILED>
  | IActionPayload<IChangeVinylNamePayload, RESOURCES_ACTION_TYPES.CHANGE_VINYL_NAME>
  | IActionPayload<IChangeVinylNamePayload, RESOURCES_ACTION_TYPES.CHANGE_VINYL_ARTIST>
  | IActionPayload<IChangeVinylNamePayload, RESOURCES_ACTION_TYPES.CHANGE_VINYL_ALBUM_TITLE>
  | IActionPayload<number, RESOURCES_ACTION_TYPES.SAVE_VINYL_CHANGES>
  | IAction<RESOURCES_ACTION_TYPES.SAVE_VINYL_CHANGES_SUCCESS>
  | IActionPayload<string, RESOURCES_ACTION_TYPES.SAVE_VINYL_CHANGES_FAILED>
  | IActionPayload<IChangeTrackNamePayload, RESOURCES_ACTION_TYPES.CHANGE_TRACK_NAME>;

export interface IGetResourcesSuccess {
  data: IListResponse;
}

export interface IAddResourcePayload {
  name: string;
  artist: string;
  album_title: string;
  tracks?: Array<IAddTrackPayload>;
}

export interface IAddTrackPayload {
  name: string;
}

export interface IDeleteTrackActionPayload {
  vinylId: number;
  trackId: number;
}

export interface IChangeVinylNamePayload {
  vinylId: number;
  value: string;
}

export interface IChangeTrackNamePayload {
  vinylId: number;
  trackId: number;
  value: string;
}
