import React, { useState, useEffect } from "react";
import { FixturesCollection } from "../../db/FixturesCollection";
import { useTracker } from "meteor/react-meteor-data";
import { useLocation, useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { FixtureItem } from "./FixtureItem";
export const FixturesList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const useQuery = () => new URLSearchParams(location.search);
  const query = useQuery();
  const initialSearch = query.get("search") || "";

  const [search, setSearch] = useState(initialSearch);

  const fixtures = useTracker(() => {
    Meteor.subscribe("fixtures");
    return FixturesCollection.find({}, { sort: { createdAt: -1 } }).fetch();
  }, []);

  const filteredFixtures = fixtures.filter((fixture) => {
    return (
      fixture.home_team.toLowerCase().includes(search) ||
      fixture.away_team.toLowerCase().includes(search) ||
      fixture.competition_name.toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    if (search) {
      navigate(`?search=${encodeURIComponent(search)}`);
    } else {
      navigate("/fixtures");
    }
  }, [search, navigate, initialSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search fixtures..."
        className="mt-2 mb-5 p-2 border border-gray-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h2 className="text-3xl font-medium pl-1">Fixtures</h2>
      <ul role="list" className="divide-y divide-gray-500 mt-5">
        {filteredFixtures.map((fixture) => (
          <FixtureItem key={fixture._id} fixture={fixture} />
        ))}
      </ul>
    </div>
  );
};
