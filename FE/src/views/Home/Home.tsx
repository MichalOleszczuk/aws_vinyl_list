import React, { memo } from 'react';
import { Container, Dropdown, Form, Spinner, Table } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import AddVinylForm from './components/AddVinylForm';
import { useHome } from './useHome';

function Home(_props: RouteComponentProps) {
  const {
    resourcesInProgress,
    resources,
    onDeleteVinyl,
    onDeleteTrack,
    onChangeVinylName,
    onChangeVinylArtist,
    onChangeVinylAlbumTitle,
    onSaveVinylChanges,
    onChangeTrackValue,
  } = useHome();

  return (
    <Container className='h-100'>
      {resourcesInProgress ? (
        <div className='pt-5 h-100 d-flex justify-content-center align-items-center flex-column'>
          <div className='w-100 d-flex justify-content-center align-items-center pb-3'>Loading...</div>
          <div className='w-100 d-flex justify-content-center align-items-center'>
            <Spinner animation='border' />
          </div>
        </div>
      ) : (
        <>
          <AddVinylForm />
          <Table striped bordered hover variant='dark' className='mb-5'>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Artist</th>
                <th>Album Title</th>
                <th>Acctions</th>
              </tr>
            </thead>
            {console.log('siema', resources)}
            <tbody>
              {resources.map((vinyl) => (
                <React.Fragment key={vinyl.id}>
                  <tr key={vinyl.id}>
                    <td>{vinyl.id}</td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          type='text'
                          value={vinyl.name}
                          onChange={(event: React.ChangeEvent<any>) => onChangeVinylName(event, vinyl.id)}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          type='text'
                          value={vinyl.artist}
                          onChange={(event: React.ChangeEvent<any>) => onChangeVinylArtist(event, vinyl.id)}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          type='text'
                          value={vinyl.album_title}
                          onChange={(event: React.ChangeEvent<any>) => onChangeVinylAlbumTitle(event, vinyl.id)}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant='secondary' id='dropdown-vinyl'>
                          Actions
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => onDeleteVinyl(vinyl.id)}>Delete</Dropdown.Item>
                          <Dropdown.Item onClick={() => onSaveVinylChanges(vinyl.id)}>Save changes</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                  {vinyl.tracks.map((track) => (
                    <tr key={track.id}>
                      <td></td>
                      <td>Track</td>
                      <td>
                        <Form.Group>
                          <Form.Control
                            type='text'
                            value={track.name}
                            onChange={(event: React.ChangeEvent<any>) => onChangeTrackValue(event, vinyl.id, track.id)}
                          />
                        </Form.Group>
                      </td>
                      <td></td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle variant='secondary' id='dropdown-track'>
                            Track Actions
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => onDeleteTrack(vinyl.id, track.id)}>Delete</Dropdown.Item>
                            <Dropdown.Item onClick={() => onSaveVinylChanges(vinyl.id)}>Save changes</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}

export default memo(Home);
