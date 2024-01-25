import { Meteor } from "meteor/meteor";
import { Match, check } from "meteor/check";
import { FixturesCollection, Fixture } from "/imports/db/FixturesCollection";

Meteor.methods({
  "file.upload": async (data) => {
    const parsed = JSON.parse(data);
    check(parsed, Array);
    async function insertFixture({
      fixture_mid,
      home_team,
      away_team,
      competition_name,
      fixture_datetime,
      fixture_round,
      season,
    }: Fixture) {
      await FixturesCollection.insertAsync({
        fixture_mid,
        home_team,
        away_team,
        competition_name,
        fixture_datetime,
        fixture_round,
        season,
        createdAt: new Date(),
        readOnly: true,
      });
    }

    if (parsed.length > 0) {
      try {
        for (let fixture of parsed) {
          //@ts-ignore
          await insertFixture(fixture);
        }

        return { status: 200, message: "File uploaded successfully" };
      } catch (error: any) {
        throw new Meteor.Error("insert-failure", "Failed to insert fixtures", error.message);
      }
    }
  },
});
