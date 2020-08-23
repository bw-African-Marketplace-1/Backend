exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Fady Gouda',
          username: 'Fadygouda',
          password: 'chicken',
          email: 'gouda@gouda.com'
        },
        {
          name: 'Roberto Carlos',
          username: 'Legendarycarlos',
          password: 'FutbolIsLife',
          email: 'soccer@soccer.com'
        }
      ]);
    });
};