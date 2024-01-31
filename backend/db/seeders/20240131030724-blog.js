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
          body: "One of the main reasons I use a Mac at work while most of my coworkers use either a Windows or a Linux machine is the vast array of unique and innovative apps that the macOS ecosystem boasts. My days at work are primarily hectic and tedious, and the kind of work we do daily is very time-sensitive, and every second countsSo, naturally, productivity and efficiency in my workplace, just like most others, are paramountWe all know that you might have the most powerful Mac with the best configurations, but it isn’t worth much if you don’t have the right set of appsAs a tech content writer, I know this better than anyone, so I have filled my Mac up to the brim with carefully selected apps that help to turn my Mac into a productivity powerhouseIn this post, I will share with you eight apps I have in my work Mac that I use daily and are non-negotiable for my workflow to continue smoothlyThey have become integral to my daily work routine, and each of these apps adds a layer of efficiency, convenience, and functionality to my Mac, tailoring it to my exact needsLet’s dive in! Hopefully, you will discover a few apps on this list that can transform your workflow and Mac experienceNote: Some apps in this list require a subscription fee. But you can use my Setapp Affiliate link below to try out these apps for free for 30 days. Use the code ‘usefultech’ to avail of the offerSetapp is an app library with over 200+ premium macOS apps, all of which can be used for just $9.99 a month after 30 days of free trial! Setapp is where I discovered some of the apps in this list that I now use every day!",
          tags: "Technology",
          thumbnail:
            "https://miro.medium.com/v2/resize:fit:3584/format:webp/1*Nw7uiwo90bVLeUfQ_rJqnw.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "The Journey Journal",
          body: "From as early as I could remember I’ve always been fascinated about Tech, particularly the Hardware components and how each part of a machine although made from different Raw Materials could still be Tailored and Refined to do the manufacturer’s bidding. It’s why Apple’s line of products since the Transition to Apple Silicon have always been interesting to me because despite the fact that they aren’t exactly made in-house, they are made so much to their specifications that they are branded as Apple’s(more on this in subsequent write-ups). And then you take those parts and make them speak to each other to achieve one goal - That is fascinating!I’ve desired various Career paths from childhood, from wanting to be a Weapons Manufacturer(for reasons I can’t remember for the life of me), to Aerospace Engineering out of a desire to fly to Cinematography and Filmmaking(still do this btw) to Software Engineering because I mean no matter how much Incredible Engineering goes into making that gadget, without the right Software it still isn’t as good as the Manufacturer envisioned.Stark Industries.So, I decided Software Engineering was the path to give myself to and I began my Frontend Development journey. I do not believe any Career path is abnormally difficult, I think everything worth doing at all has to have a minimum level of difficulty attached to it for it to make sense(just my thought process) but it just wasn’t right for me at the time, I don’t exactly know how to explicitly explain this but I am on a personal crusade to enjoy everything I set out to do because that’s the one of the ways I can end up producing Maximum Output but it just wasn’t the case in that space and so I decided to continue exploring the vast ocean of possibilities in the Tech Industry.And then I stumbled upon the entire world of Decentrality and just like Gojo Satorou, I too began to feel as though:The Awakening.There almost an infinite number of possibilities in this space that I haven’t even decided completely what aspect I want to be devoted entirely to but why rush? This is more about the Journey for me and being as versed in as many things as possible from Cryptography to Auditing to all-round Security. I have so much to say about this space, and I’m loving every bit of the journey and would love if you could go on this journey with me.So stay tuned because I love to rant about things I’m passionate about and in an Array of things I’m passionate about, Tech is[0].",
          tags: "Professional Development",
          thumbnail:
            "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*qrReSdqpnAAIQrCkeYPyRw.jpeg",
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
