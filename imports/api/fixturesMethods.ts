import { Meteor } from "meteor/meteor";
import { Match, check } from "meteor/check";
import { Fixture, FixturesCollection } from "../db/FixturesCollection";
import { v4 as uuidv4 } from "uuid";
Meteor.methods({
  "fixtures.insert"(fixture) {
    check(fixture, {
      homeTeam: String,
      awayTeam: String,
      competitionName: String,
      season: String,
      round: Number,
    });

    const payload: Fixture = {
      home_team: fixture.homeTeam, // Assuming home_team is the correct field name
      away_team: fixture.awayTeam, // Assuming away_team is the correct field name
      competition_name: fixture.competitionName, // Adjust field name as per Fixture type
      season: fixture.season,
      fixture_round: fixture.round,
      readOnly: false,
      fixture_datetime: "fsdfa",
      fixture_mid: uuidv4(),
      createdAt: new Date(), // Add a createdAt field
    };

    FixturesCollection.insert(payload);
  },

  "fixture.updateById"(fixture_mid, updatedFixture) {
    check(fixture_mid, String);
    check(updatedFixture, {
      homeTeam: String,
      awayTeam: String,
      competitionName: String,
      season: String,
      round: Number,
    });

    let payload: Partial<Fixture> = {
      home_team: updatedFixture.homeTeam,
      away_team: updatedFixture.awayTeam,
      competition_name: updatedFixture.competitionName,
      season: updatedFixture.season,
      fixture_round: updatedFixture.round,
      updatedAt: new Date(),
    };

    FixturesCollection.update({ fixture_mid: fixture_mid }, { $set: payload });
  },
});
