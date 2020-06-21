export type IListResponse = Array<IResource>;

export interface IResource {
  id: number;
  name: string;
  artist: string;
  album_title: string;
  tracks: Array<ITrack>;
}

export interface ITrack {
  id: number;
  name: string;
}

export interface IAddResourceReqPayload {
  name: string;
  artist: string;
  album_title: string;
  tracks?: Array<IAddTrackReqPayload>;
}

export interface IAddTrackReqPayload {
  name: string;
}
