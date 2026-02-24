import type { Client, Server } from "@rbxts/remo";
import { createRemotes, namespace, remote } from "@rbxts/remo";

// remo currently does not properly support (maybe?) multiple createRemotes,
// creating potential conflicts if the user uses remo. we use
// this unique string for the namespace name - tostring({}) is mostly unique, and
// the concat guarantees unique-ness. its typed as a literal string so we can
// index w/o a question mark
// eslint-disable-next-line ts/no-non-null-assertion -- See above
const uniqueAsString = `__cmdi_remotes:${tostring({})!}` as "__cmdi_remotes:";

const globalRemotes = createRemotes({
	[uniqueAsString]: namespace({
		init: remote<Server>(),
	}),
});

export const remotes = globalRemotes[uniqueAsString];
