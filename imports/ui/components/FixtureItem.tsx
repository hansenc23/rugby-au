import React from "react";
import { Fixture } from "../../db/FixturesCollection";
import { Link } from "react-router-dom";
type FixtureItemProps = {
  fixture: Fixture;
};
export const FixtureItem: React.FC<FixtureItemProps> = ({ fixture }) => {
  const { _id, fixture_mid, away_team, fixture_datetime, fixture_round, home_team, season, competition_name } = fixture;

  return (
    <Link to={`/fixture/${_id}`} className="shadow-md">
      <li className="flex justify-between gap-x-6 p-5 mb-5 hover:bg-slate-100 shadow-lg rounded-lg">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {home_team} vs {away_team}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {competition_name} {season}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};
