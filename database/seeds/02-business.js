exports.seed = function(knex) {
  return knex('business').insert([
    {
      name: 'Gouda industries',
      description: 'Well builder',
      location: 'Egypt',
      user_id: '1'
    },
    {
      name: 'Farmlands',
      description: 'We are farmers trying to be as low cost as possible',
      location: 'Mexico',
      user_id: '2'
    }
  ]);
};
