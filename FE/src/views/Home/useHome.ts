import { useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  changeTrackValueAction,
  changeVinylAlbumTitleAction,
  changeVinylArtistAction,
  changeVinylNameAction,
  deleteResourceAction,
  deleteTrackResourceAction,
  getResourcesAction,
  saveVinylChangesAction,
} from '../../services/ResourcesList/redux/actions/resourcesActions';
import { resourcesSelector } from '../../services/ResourcesList/redux/selectors/resourcesListSelectors';

export function useHome() {
  const dispatch = useDispatch();
  const { inProgress, resources } = useSelector(resourcesSelector, shallowEqual);

  useEffect(() => {
    dispatch(getResourcesAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDeleteVinyl = useCallback(
    (vinylId: number) => {
      dispatch(deleteResourceAction(vinylId));
    },
    [dispatch],
  );

  const onDeleteTrack = useCallback(
    (vinylId: number, trackId: number) => {
      dispatch(deleteTrackResourceAction({ vinylId, trackId }));
    },
    [dispatch],
  );

  const onChangeVinylName = useCallback(
    (event: React.ChangeEvent<any>, vinylId: number) => {
      const value = event.target.value;
      dispatch(changeVinylNameAction({ vinylId, value: value || '' }));
    },
    [dispatch],
  );

  const onChangeVinylArtist = useCallback(
    (event: React.ChangeEvent<any>, vinylId: number) => {
      const value = event.target.value;
      dispatch(changeVinylArtistAction({ vinylId, value: value || '' }));
    },
    [dispatch],
  );

  const onChangeVinylAlbumTitle = useCallback(
    (event: React.ChangeEvent<any>, vinylId: number) => {
      const value = event.target.value;
      dispatch(changeVinylAlbumTitleAction({ vinylId, value: value || '' }));
    },
    [dispatch],
  );

  const onSaveVinylChanges = useCallback(
    (vinylId: number) => {
      dispatch(saveVinylChangesAction(vinylId));
    },
    [dispatch],
  );

  const onChangeTrackValue = useCallback(
    (event: React.ChangeEvent<any>, vinylId: number, trackId: number) => {
      const value = event.target.value;
      dispatch(changeTrackValueAction({ vinylId, trackId, value: value || '' }));
    },
    [dispatch],
  );

  return {
    resourcesInProgress: inProgress,
    resources,
    onDeleteVinyl,
    onDeleteTrack,
    onChangeVinylName,
    onChangeVinylArtist,
    onChangeVinylAlbumTitle,
    onSaveVinylChanges,
    onChangeTrackValue,
  };
}
