import React, { memo } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useAddVinylForm } from './useAddVinylForm';

function AddVinylForm() {
  const {
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
  } = useAddVinylForm();

  return (
    <Form className='p-3' onSubmit={onSubmit}>
      <Form.Group as={Row}>
        <Col sm={4}>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Name' value={vinylName} onChange={onChangeVinylName} />
        </Col>
        <Col sm={4}>
          <Form.Label>Artist</Form.Label>
          <Form.Control type='text' placeholder='Artist' value={vinylArtist} onChange={onChangeVinylArtist} />
        </Col>
        <Col sm={4}>
          <Form.Label>Album Title</Form.Label>
          <Form.Control type='text' placeholder='Album Title' value={vinylAlbum} onChange={onChangeVinylAlbum} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={12}>
          <Form.Label>Tracks</Form.Label>
          <Form.Control
            type='text'
            placeholder='Tracks'
            isInvalid={areTracksInvalid}
            value={vinylTracks}
            onChange={onChangeVinylTracks}
          />
          <Form.Control.Feedback type='invalid'>{tracksInvalidMessage}</Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Button variant='primary' type='submit'>
        Add vinyl
      </Button>
    </Form>
  );
}

export default memo(AddVinylForm);
