const Location = require('./Location');
const Book = require('../book/Book');

const create = async (body) => {
  const { name, parentLocationId } = body;

  const data = { name }

  const location = await Location.findOne({ where: { name, parentLocationId } });
  if (location) {
    throw Error("Location name already exists")
  }

  if (parentLocationId) {
    const location = await Location.findOne({ where: { id: parentLocationId } })
    if (location) {
      data.parentLocationId = parentLocationId
      data.parentLocationName = location.name
    }
  }
  await Location.create(data);
};

const getParentLocations = async (location) => {
  if (!location.parentLocationId) {
    return [];
  }
  const parentLocation = await Location.findByPk(location.parentLocationId);
  const parentLocations = await getParentLocations(parentLocation);
  return [...parentLocations, parentLocation];
};

const getLocationPath = async (id) => {
  const location = await Location.findByPk(id);
  const results = await getParentLocations(location);
  
  return [...results, location];
};

const getChildren = async (locationId) => {
  const [ locations, books ] = await Promise.all([
    Location.findAll({ where: { parentLocationId: locationId}}),
    Book.findAll({ where: { locationId }})
  ]);
  const results = [];

  for(let i = 0; i < locations.length; i++) {
    const { name, id, parentLocationId: parent } = locations[i]
    results.push({ type: 'location', name, parent, id })
  }

  for(let i = 0; i < books.length; i++) {
    const { title: name, id, locationId: parent } = books[i]
    results.push({ type: 'book', name, parent, id })
  }

  return results;
};


const destroy = async (id) => {
  await Location.destroy({
    where: { id }
  });
};

module.exports = {
  create,
  getLocationPath,
  getChildren,
  destroy
};
