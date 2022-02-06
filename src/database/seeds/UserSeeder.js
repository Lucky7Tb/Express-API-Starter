const { Hash } = require('../../helpers');

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(async () => {
      // Inserts seed entries
      return knex('users').insert([
        {
					name: 'Lucky Tri Bhakti',
					email: 'lucky@mail.com',
					password: await Hash.hashPassword('123456789'),
					created_at: new Date(),
					updated_at: new Date(),
				},
      ]);
    });
};
