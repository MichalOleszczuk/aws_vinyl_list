import { AxiosPromise } from 'axios';
import { ApiService } from '../ApiService';
import { IAddResourceReqPayload, IListResponse } from './interfaces/IResourcesListService';

export interface IResourcesListService {
  getResourcesList: () => AxiosPromise<IListResponse>;
  createResource: (reqData: IAddResourceReqPayload) => AxiosPromise<unknown>;
  deleteResource: (vinylId: number) => AxiosPromise<unknown>;
  deleteTrackResource: (vinylId: number, trackId: number) => AxiosPromise<unknown>;
  updateResource: (reqData: IAddResourceReqPayload, vinylId: number) => AxiosPromise<unknown>;
}

export const ResourcesListService: IResourcesListService = {
  getResourcesList() {
    return ApiService.get('/list');
  },
  createResource(reqData) {
    return ApiService.post('/', reqData);
  },
  deleteResource(vinylId) {
    return ApiService.delete(`/${vinylId}`);
  },
  deleteTrackResource(vinylId, trackId) {
    return ApiService.delete(`/${vinylId}/track/${trackId}`);
  },
  updateResource(reqData, vinylId) {
    return ApiService.put(`/${vinylId}`, reqData);
  },
};
