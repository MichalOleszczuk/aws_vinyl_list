import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addResourceAction } from '../../../services/ResourcesList/redux/actions/resourcesActions';

export const regexSeparatedBySpaces = /^[a-zA-Z\s]*$/;

export function useAddVinylForm() {
  const dispatch = useDispatch();
  const [vinylName, setVinylName] = useState('');
  const [vinylArtist, setVinylArtist] = useState('');
  const [vinylAlbum, setVinylAlbum] = useState('');
  const [vinylTracks, setVinylTracks] = useState('');
  const [areTracksInvalid, setAreTracksInvalid] = useState(false);
  const [tracksInvalidMessage, setTracksInvalidMessage] = useState('');

  const tracksToSave = useMemo(() => {
    const result = vinylTracks.split(' ').map((track) => {
      return { name: track };
    });
    return result;
  }, [vinylTracks]);

  // INFO: React.ChangeEvent<any> is any because r-bootstrap types are unstable.
  const onChangeVinylName = (event: React.ChangeEvent<any>) => {
    setVinylName((event.target.value as string) || '');
  };

  const onChangeVinylArtist = (event: React.ChangeEvent<any>) => {
    setVinylArtist((event.target.value as string) || '');
  };

  const onChangeVinylAlbum = (event: React.ChangeEvent<any>) => {
    setVinylAlbum((event.target.value as string) || '');
  };

  const onChangeVinylTracks = (event: React.ChangeEvent<any>) => {
    const value = event.target.value as string;
    setVinylTracks(value || '');
    const isInvalid = !regexSeparatedBySpaces.test(value);
    if (isInvalid) {
      setAreTracksInvalid(true);
      setTracksInvalidMessage('Invalid tracks input, provide list of phrases separated by whitespace');
    } else {
      setAreTracksInvalid(false);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addResourceAction({ name: vinylName, artist: vinylArtist, album_title: vinylAlbum, tracks: tracksToSave }),
    );
  };

  return {
    areTracksInvalid,
    tracksInvalidMessage,
    vinylName,
    onChangeVinylName,
    vinylArtist,
    onChangeVinylArtist,
    vinylAlbum,
    onChangeVinylAlbum,
    vinylTracks,
    onChangeVinylTracks,
    onSubmit,
  };
}
