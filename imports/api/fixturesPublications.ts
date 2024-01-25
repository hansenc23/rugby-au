import { Meteor } from "meteor/meteor";
import { FixturesCollection } from "/imports/db/FixturesCollection";

Meteor.publish("fixtures", () => {
  return FixturesCollection.find(
    {},
    {
      sort: { createdAt: -1 },
    }
  );
});

// Meteor.publish("fixtureById", (fixture_mid: string) => {
//   return FixturesCollection.find({ fixture_mid: { $eq: fixture_mid } });
// });
Meteor.publish("fixtureById", function (fixture_mid) {
  // Check if the user is logged in or any other authentication/authorization logic if needed
  // For example:
  // if (!this.userId) {
  //   return this.ready();
  // }

  // Publish the fixture by fixture_mid
  return FixturesCollection.find({ fixture_mid: { $eq: fixture_mid } });
});

Meteor.publish("home-teams", () => {
  return FixturesCollection.find(
    {},
    {
      fields: { home_team: 1 },
    }
  );
});

Meteor.publish("away-teams", () => {
  return FixturesCollection.find(
    {},
    {
      fields: { away_team: 1 },
    }
  );
});
