import isentinel, { type TypedFlatConfigItem } from "@isentinel/eslint-config";

export default isentinel(
	{
		name: "project/root",
		namedConfigs: true,
		pnpm: true,
		react: true,
		roblox: true,

		// Genuinely disgusting time taken sob
		spellCheck: false,
	},
	{
		name: "project/sort",
		rules: {
			"perfectionist/sort-enums": [
				"error",
				{
					partitionByComment: true,
					partitionByNewLine: true,
				},
			],
		},
	} satisfies TypedFlatConfigItem,
);
