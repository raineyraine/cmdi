import isentinel, { type TypedFlatConfigItem } from "@isentinel/eslint-config";

export default isentinel(
	{
		name: "project/root",
		namedConfigs: true,
		pnpm: true,
		react: true,
		roblox: true,

		// disabled due to genuinely insane time taken for little benefit. look
		// into re-enabling for documentation files?
		spellCheck: false,
	},
	{
		name: "project/sort",
		rules: {
			"perfectionist/sort-classes": [
				"error",
				{
					partitionByNewLine: false,
				},
			],
			"perfectionist/sort-imports": [
				"error",
				{
					partitionByNewLine: false,
				},
			],
		},
		settings: {
			perfectionist: {
				partitionByComment: true,
				partitionByNewLine: true,
			},
		},
	} satisfies TypedFlatConfigItem,
);
