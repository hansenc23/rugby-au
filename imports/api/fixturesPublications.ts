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

Meteor.publish("fixtureById", (_id: string) => {
  return FixturesCollection.find({ _id: { $eq: _id } });
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
