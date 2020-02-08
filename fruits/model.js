import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/produce.db3'
  },
  useNullAsDefault: true
});

const findAll = () => db('fruits');
const findById = id => db('fruits').where({ id }).first();
const add = newFruit => db('fruits').insert(newFruit, 'id');
const update = (id, changes) => db('fruits').where({ id }).update(changes);
const remove = id => db('fruits').where({ id }).del();


const Fruit = {
  findAll,
  findById,
  add,
  update,
  remove,
}

export default Fruit;
