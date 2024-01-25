import { Meteor } from "meteor/meteor";
import { Link, LinksCollection } from "/imports/api/links";
import "/imports/api/fileMethods";
import "/imports/api/fixturesPublications";
import "/imports/api/fixturesMethods";
async function insertLink({ title, url }: Pick<Link, "title" | "url">) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {});
