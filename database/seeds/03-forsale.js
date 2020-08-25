
exports.seed = function(knex) {
  // Deletes ALL existing entries
      return knex('for-sale').insert([
        {
          item: 'Wells made of bricks',
          category: 'Resources',
          price: '$200.00',
          location: 'Alexandria, Egypt',
          description: 'Wells made of bricks whill last up to 50 years!',
          business_id: 1
        },
        {
          item: 'Chicken',
          category: 'Livestock',
          price: '$10.00',
          location: 'Mexico',
          description: 'Fresh chicken, dead or alive!',
          business_id: 2
        }
      ]);
    };