
const brad = {
  id: '1',
  name: 'Brad',
  age: '55'
};

const mel = {
  id: '2',
  name: 'Mel',
  age: '65'
};

const fight = {
  id: '1',
  title: 'fight club',
  description: 'fight club',
  actors: ['1']
};

const maverick = {
    id: '2',
    title: 'maverick',
    description: 'maverick',
    actors: ['2']
};

const data = {
  Movie: {
    '1': fight,
    '2': maverick
  },
  Actor: {
    '1': brad,
    '2': mel,
  }
};

// export function createShip(shipName, factionId) {
//   const newShip = {
//     id: String(nextShip++),
//     name: shipName
//   };
//   data.Ship[newShip.id] = newShip;
//   data.Faction[factionId].ships.push(newShip.id);
//   return newShip;
// }

export function getActor(id) {
  return data.Actor[id];
}

export function getMovie(id) {
  return data.Movie[id];
}

export function getRebels() {
  return rebels;
}

export function getEmpire() {
  return empire;
}