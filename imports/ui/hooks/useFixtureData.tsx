import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { FixturesCollection, Fixture } from "../../db/FixturesCollection";
import { Meteor } from "meteor/meteor";

export const useHomeTeam = (): Fixture[] => {
  return useTracker(() => {
    Meteor.subscribe("home-teams");
    return FixturesCollection.find(
      {},
      {
        fields: { home_team: 1 },
      }
    ).fetch();
  }, []);
};

export const useAwayTeam = (): Fixture[] => {
  return useTracker(() => {
    Meteor.subscribe("away-teams");
    return FixturesCollection.find(
      {},
      {
        fields: { away_team: 1 },
      }
    ).fetch();
  }, []);
};

export const useFixtureById = (_id: string) => {
  return useTracker(() => {
    Meteor.subscribe("fixtureById", _id);
    const fixture = FixturesCollection.findOne({ _id: _id });
    return fixture;
  });
};
