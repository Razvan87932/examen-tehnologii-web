'use strict';

const faker = require("faker");

function generateAuthors(size) {
  let authors = "";

  for (let i = 0; i < size - 1; i++) {
    authors += faker.name.lastName() + ", "
  }

  authors += faker.name.lastName();

  return authors;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const data = [];
     for(let i = 0; i < 200; i++) {
       data.push({
         articleId: faker.datatype.number({min: 1, max: 20}),
         title: faker.lorem.words(5),
         authors: generateAuthors(faker.datatype.number({min: 2, max: 5})),
         date: new Date(),
         createdAt: new Date(),
         updatedAt: new Date()
       });
     }
 
     await queryInterface.bulkInsert('References', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
