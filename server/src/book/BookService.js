const Book = require('./Book');

const create = async (body) => {
  const { title, locationId } = body;
  const book = await Book.findOne({ where: { title, locationId } });

  if (book) {
    throw Error("Title already exists")
  }
  await Book.create({ title, locationId });
}


const updateLocation = async (id, locationId) => {
  const book = await Book.findOne({ where: { id } });
  if (book) {
    book.locationId = locationId;
    await book.save();
  }
}

const destroy = async (id) => {
  await Book.destroy({
    where: { id }
  });
};

module.exports = {
  create,
  updateLocation,
  destroy
}
