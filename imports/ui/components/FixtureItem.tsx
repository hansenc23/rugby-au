import React from "react";
import { Fixture } from "../../db/FixturesCollection";
import { Link } from "react-router-dom";
type FixtureItemProps = {
  fixture: Fixture;
};
export const FixtureItem: React.FC<FixtureItemProps> = ({ fixture }) => {
  const { fixture_mid, away_team, fixture_datetime, fixture_round, home_team, season, competition_name } = fixture;

  return (
    <Link to={`/fixture/${fixture_mid}`}>
      <li className="group/item flex justify-between gap-x-6 p-5 hover:rounded-lg hover:bg-slate-100">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {home_team} vs {away_team}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {competition_name} {season}
            </p>
            {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">Round: {fixture_round}</p> */}
          </div>
        </div>

        {/* <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time>
          </p>
        </div> */}
      </li>
    </Link>
  );
};
