const fs = require('fs');
const path = require('path');
const dbPath = path.resolve(__dirname, 'db.json');

exports.getVinyllsList = function getVinyllsList() {
  const db = JSON.parse(fs.readFileSync(dbPath));
  return db.vinylls;
};

exports.createNewRecord = function createNewRecord(vinyll) {
  const newVinyl = { id: Date.now(), ...vinyll };

  if (!newVinyl.tracks) {
    newVinyl.tracks = [];
  } else {
    newVinyl.tracks = newVinyl.tracks.map((track, index) => {
      return { id: parseInt(Date.now() + index, 10), name: track.name };
    });
  }

  const newVinyllsList = [...this.getVinyllsList()];
  newVinyllsList.push(newVinyl);
  fs.writeFileSync(dbPath, JSON.stringify({ vinylls: newVinyllsList }));
  return;
};

exports.updateRecord = function updateRecord(id, vinyll) {
  let newVinyllsList = [...this.getVinyllsList()];

  let updatedVinyll = newVinyllsList.find((vin) => vin.id === id);
  updatedVinyll = { ...vinyll, id };

  newVinyllsList = newVinyllsList.map((vin) => (vin.id === id ? updatedVinyll : vin));
  fs.writeFileSync(dbPath, JSON.stringify({ vinylls: newVinyllsList }));
  return;
};

exports.deleteRecord = function deleteRecord(id) {
  const newVinyllsList = [...this.getVinyllsList()].filter((vin) => vin.id !== id);

  fs.writeFileSync(dbPath, JSON.stringify({ vinylls: newVinyllsList }));
  return;
};

exports.deleteTrackRecord = function deleteTrackRecord(vinylId, trackId) {
  const newVinyllsList = [...this.getVinyllsList()].map((vinyl) =>
    vinyl.id !== vinylId ? vinyl : { ...vinyl, tracks: vinyl.tracks.filter((track) => track.id !== trackId )},
  );

  fs.writeFileSync(dbPath, JSON.stringify({ vinylls: newVinyllsList }));
  return;
};
