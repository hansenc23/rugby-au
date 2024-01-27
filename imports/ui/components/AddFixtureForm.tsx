import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Fixture } from "../../db/FixturesCollection";
import { useAwayTeam, useHomeTeam } from "../hooks/useFixtureData";
import useAlertMessage from "../hooks/useAlertMessage";
import { formatDuration } from "../utils";
export const AddFixtureForm = () => {
  const homeTeams: Pick<Fixture, "home_team" | "_id">[] = useHomeTeam();
  const awayTeams: Pick<Fixture, "away_team" | "_id">[] = useAwayTeam();
  const [message, setMessage, color] = useAlertMessage();

  const homeTeamsUnique = React.useMemo(() => {
    const uniqueTeams = new Map();
    homeTeams.forEach((item) => {
      if (!uniqueTeams.has(item.home_team)) {
        uniqueTeams.set(item.home_team, item);
      }
    });
    return Array.from(uniqueTeams.values());
  }, [homeTeams]);

  const awayTeamsUnique = React.useMemo(() => {
    const uniqueTeams = new Map();
    awayTeams.forEach((item) => {
      if (!uniqueTeams.has(item.away_team)) {
        uniqueTeams.set(item.away_team, item);
      }
    });
    return Array.from(uniqueTeams.values());
  }, [awayTeams]);

  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam, setAwayTeam] = useState<string>("");
  const [competitionName, setCompetitionName] = useState<string>("");
  const [season, setSeason] = useState<string>("");
  const [round, setRound] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handleHomeTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHomeTeam(event.target.value);
  };
  const handleAwayTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAwayTeam(event.target.value);
  };

  const handleCompetitionNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompetitionName(event.target.value);
  };

  const handleRoundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRound(parseInt(event.target.value));
  };

  const handleSeasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeason(event.target.value);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(parseFloat(event.target.value));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!homeTeam || !awayTeam || !competitionName || !season || isNaN(round) || isNaN(duration)) {
      setMessage({ text: "Please fill in all fields correctly.", type: "error" });
      return;
    }

    const formattedDuration = formatDuration(duration);

    const payload = {
      homeTeam,
      awayTeam,
      competitionName,
      season,
      round,
      duration: formattedDuration,
    };
    Meteor.call("fixtures.insert", payload, (error: Meteor.Error) => {
      if (error) {
        setMessage({ text: `Error: ${error.message}`, type: "error" });
      } else {
        setAwayTeam("");
        setHomeTeam("");
        setCompetitionName("");
        setRound(0);
        setSeason("");
        setDuration(0);
        setMessage({ text: "Fixture added successfully!", type: "success" });
      }
    });
  };

  const renderAlert = () => {
    return message ? (
      <div className={`${color} border px-4 py-3 rounded relative`} role="alert">
        <span className="block sm:inline">{message?.text}</span>
      </div>
    ) : null;
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Add a fixture</h1>
      <form className="w-full mt-6" onSubmit={handleFormSubmit}>
        <div className="flex flex-wrap -mx-3 sm:mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              Home Team
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={handleHomeTeamChange}
                value={homeTeam}
                required
                id="grid-state"
              >
                <option></option>
                {homeTeamsUnique.length > 0
                  ? homeTeamsUnique.map(({ _id, home_team }) => (
                      <option key={_id} value={home_team}>
                        {home_team}
                      </option>
                    ))
                  : null}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              Away Team
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={handleAwayTeamChange}
                value={awayTeam}
                required
                id="grid-state"
              >
                <option></option>
                {awayTeamsUnique.length > 0
                  ? awayTeamsUnique.map(({ _id, away_team }) => (
                      <option key={_id} value={away_team}>
                        {away_team}
                      </option>
                    ))
                  : null}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Competition Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              required
              placeholder="Competition name"
              onChange={handleCompetitionNameChange}
              value={competitionName}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Season
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              required
              placeholder="Season"
              onChange={handleSeasonChange}
              value={season}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Round
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              required
              type="number"
              placeholder="Round"
              value={round}
              onChange={handleRoundChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 sm:mt-6">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Duration (minutes)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              required
              type="number"
              placeholder="Duration"
              value={duration}
              min="0"
              step="0.1"
              onChange={handleDurationChange}
            />
          </div>
        </div>
        {message && renderAlert()}
        <button className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded text-center mt-6" type="submit">
          Add Fixture
        </button>
      </form>
    </>
  );
};
