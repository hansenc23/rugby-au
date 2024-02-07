import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
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
      duration: String,
    });

    const payload: Fixture = {
      home_team: fixture.homeTeam, // Assuming home_team is the correct field name
      away_team: fixture.awayTeam, // Assuming away_team is the correct field name
      competition_name: fixture.competitionName, // Adjust field name as per Fixture type
      season: fixture.season,
      fixture_round: fixture.round,
      readOnly: false,
      fixture_datetime: fixture.duration,
      fixture_mid: uuidv4(),
      createdAt: new Date(), // Add a createdAt field
    };

    FixturesCollection.insert(payload);
  },

  "fixture.updateById"(_id, updatedFixture) {
    check(_id, String);
    check(updatedFixture, {
      homeTeam: String,
      awayTeam: String,
      competitionName: String,
      season: String,
      round: Number,
      duration: String,
    });

    let payload: Partial<Fixture> = {
      home_team: updatedFixture.homeTeam,
      away_team: updatedFixture.awayTeam,
      competition_name: updatedFixture.competitionName,
      season: updatedFixture.season,
      fixture_round: updatedFixture.round,
      fixture_datetime: updatedFixture.duration,
      updatedAt: new Date(),
    };

    FixturesCollection.update({ _id: _id }, { $set: payload });
  },
  "fixture.deleteById"(_id) {
    check(_id, String);

    FixturesCollection.remove({ _id: _id });
  },
});
