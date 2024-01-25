import React from "react";
import { FixturesCollection } from "../../db/FixturesCollection";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { FixtureItem } from "./FixtureItem";
export const FixturesList = () => {
  const fixtures = useTracker(() => {
    Meteor.subscribe("fixtures");
    return FixturesCollection.find({}, { sort: { createdAt: -1 } }).fetch();
  }, []);
  return (
    <div>
      <h2>Fixtures</h2>
      <ul role="list" className="divide-y divide-gray-500">
        {fixtures.map((fixture) => (
          <FixtureItem key={fixture.fixture_mid} fixture={fixture} />
        ))}
      </ul>
    </div>
  );
};
