"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    options.tableName = "Blogs";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          title: "8 Non-Negotiable Apps I Need to Have on My Work Mac",
          description:
            "One of the main reasons I use a Mac at work while most of my coworkers use either a Windows or a Linux machine is the vast array of unique and innovative apps that the macOS ecosystem boasts. My days at work are primarily hectic and tedious, and the kind of work we do daily is very time-sensitive, and every second countsSo, naturally, productivity and efficiency in my workplace, just like most others, are paramountWe all know that you might have the most powerful Mac with the best configurations, but it isn’t worth much if you don’t have the right set of appsAs a tech content writer, I know this better than anyone, so I have filled my Mac up to the brim with carefully selected apps that help to turn my Mac into a productivity powerhouseIn this post, I will share with you eight apps I have in my work Mac that I use daily and are non-negotiable for my workflow to continue smoothlyThey have become integral to my daily work routine, and each of these apps adds a layer of efficiency, convenience, and functionality to my Mac, tailoring it to my exact needsLet’s dive in! Hopefully, you will discover a few apps on this list that can transform your workflow and Mac experienceNote: Some apps in this list require a subscription fee. But you can use my Setapp Affiliate link below to try out these apps for free for 30 days. Use the code ‘usefultech’ to avail of the offerSetapp is an app library with over 200+ premium macOS apps, all of which can be used for just $9.99 a month after 30 days of free trial! Setapp is where I discovered some of the apps in this list that I now use every day!",
          tags: "Technology",
          pictures:
            "https://miro.medium.com/v2/resize:fit:3584/format:webp/1*Nw7uiwo90bVLeUfQ_rJqnw.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    const Op = Sequelize.Op;
    options.tableName = "Blogs";
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.in]: [1] },
      },
      {}
    );
  },
};
