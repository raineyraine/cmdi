import isentinel, { type TypedFlatConfigItem } from "@isentinel/eslint-config";

const config = isentinel(
	{
		name: "project/root",
		// disabled due to genuinely insane time taken for little benefit
		formatters: {
			lua: false,
		},
		namedConfigs: true,
		pnpm: true,
		react: true,

		roblox: true,
		spellCheck: false,
	},

	// {
	// 	files: ["**/*.md"],
	// 	name: "project/markdown-perfectionist",
	// 	rules: {
	// 		"perfectionist/sort-imports": "off",
	// 	},
	// } satisfies TypedFlatConfigItem,
	{
		// ignores: ["**.md"],
		name: "project/sort",
		rules: {
			"perfectionist/sort-classes": [
				"error",
				{
					partitionByNewLine: false,
				},
			],
			"perfectionist/sort-enums": [
				"error",
				{
					partitionByNewLine: true,
				},
			],
			"perfectionist/sort-objects": [
				"error",
				{
					partitionByNewLine: true,
				},
			],
		},

		settings: {
			perfectionist: {
				partitionByComment: true,
				// would be nice to put it here but it destroys everything for
				// markdown files, perfectionist issue with sort-imports :c
				// partitionByNewLine: true,
			},
		},
	} satisfies TypedFlatConfigItem,
);

export default config;
