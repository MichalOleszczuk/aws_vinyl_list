import { IResource } from '../../interfaces/IResourcesListService';
import { IResourcesActions } from '../actions/IResourcesActions';
import { RESOURCES_ACTION_TYPES } from '../actions/resourcesActionTypes';

export interface IResourcesListReducer {
  error: string;
  resources: Array<IResource>;
  inProgress: boolean;
}

export const RESOURCES_LIST_DEFAULT_STATE = {
  error: '',
  resources: [],
  inProgress: false,
};

export const resourcesListReducer = (
  state: IResourcesListReducer = RESOURCES_LIST_DEFAULT_STATE,
  action: IResourcesActions,
) => {
  switch (action.type) {
    case RESOURCES_ACTION_TYPES.GET_RESOURCES:
    case RESOURCES_ACTION_TYPES.ADD_RESOURCE:
    case RESOURCES_ACTION_TYPES.DELETE_RESOURCE:
    case RESOURCES_ACTION_TYPES.DELETE_TRACK_RESOURCE:
    case RESOURCES_ACTION_TYPES.SAVE_VINYL_CHANGES: {
      return {
        ...state,
        error: '',
        inProgress: true,
      };
    }
    case RESOURCES_ACTION_TYPES.GET_RESOURCES_SUCCESS: {
      const { data } = action.payload;

      return {
        ...state,
        error: '',
        resources: data,
        inProgress: false,
      };
    }
    case RESOURCES_ACTION_TYPES.GET_RESOURCES_FAILED:
    case RESOURCES_ACTION_TYPES.ADD_RESOURCE_FAILED:
    case RESOURCES_ACTION_TYPES.DELETE_RESOURCE_FAILED:
    case RESOURCES_ACTION_TYPES.DELETE_TRACK_RESOURCE_FAILED:
    case RESOURCES_ACTION_TYPES.SAVE_VINYL_CHANGES_FAILED: {
      return {
        ...state,
        error: action.payload,
        inProgress: false,
      };
    }
    case RESOURCES_ACTION_TYPES.CHANGE_VINYL_NAME: {
      const { vinylId, value } = action.payload;
      return {
        ...state,
        resources: state.resources.map((resource) =>
          resource.id !== vinylId ? resource : { ...resource, name: value },
        ),
      };
    }
    case RESOURCES_ACTION_TYPES.CHANGE_VINYL_ARTIST: {
      const { vinylId, value } = action.payload;
      return {
        ...state,
        resources: state.resources.map((resource) =>
          resource.id !== vinylId ? resource : { ...resource, artist: value },
        ),
      };
    }
    case RESOURCES_ACTION_TYPES.CHANGE_VINYL_ALBUM_TITLE: {
      const { vinylId, value } = action.payload;
      return {
        ...state,
        resources: state.resources.map((resource) =>
          resource.id !== vinylId ? resource : { ...resource, album_title: value },
        ),
      };
    }
    case RESOURCES_ACTION_TYPES.CHANGE_TRACK_NAME: {
      const { vinylId, trackId, value } = action.payload;
      return {
        ...state,
        resources: state.resources.map((resource) =>
          resource.id !== vinylId
            ? resource
            : {
                ...resource,
                tracks: resource.tracks.map((track) => (track.id !== trackId ? track : { ...track, name: value })),
              },
        ),
      };
    }
    default: {
      return state;
    }
  }
};
