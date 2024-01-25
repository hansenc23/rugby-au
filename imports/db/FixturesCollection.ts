import { Mongo } from "meteor/mongo";

export interface Fixture {
  _id?: string;
  fixture_mid: string;
  season: string;
  competition_name: string;
  away_team: string;
  fixture_datetime: string;
  fixture_round: number;
  home_team: string;
  createdAt: Date;
  updatedAt?: Date;
  readOnly: boolean;
}
export const FixturesCollection = new Mongo.Collection<Fixture>("fixtures");
