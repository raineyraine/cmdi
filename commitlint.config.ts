import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

export default {
	extends: ["@commitlint/config-angular"],
	rules: {
		"body-max-length": [RuleConfigSeverity.Error, "always", 100],
		"footer-max-length": [RuleConfigSeverity.Error, "always", 100],

		"body-case": [RuleConfigSeverity.Error, "always", "sentence-case"],
		"scope-enum": [
			RuleConfigSeverity.Warning,
			"always",
			[
				// Changes to development tools and documentation, including
				// linting
				"dev",
				// Changes to dependencies
				"deps",
				// Changes to `@rbxts/cmdi` (packages/core), or relevant
				// documentation
				"core",
				// Changes to `@rbxts/cmdi-language` (packages/language), or
				// relevant documentation
				"lang",
				// Changes to `@rbxts/cmdi-ui` (packages/ui), or relevant
				// documentation
				"ui",
				// Changes to any assets (image, audio, etc)
				"assets",
				// Releasing a new version
				"release",
			],
		],

		"type-enum": [
			RuleConfigSeverity.Error,
			"always",
			[
				// Changes that affect the build system or external dependencies
				"build",
				// Changes to our CI configuration files and scripts
				"ci",
				// Documentation only changes (including JSDoc comments)
				"docs",
				// A new feature
				"feat",
				// A bug fix
				"fix",
				// A code change that improves performance
				"perf",
				// A code change that neither fixes a bug nor adds a feature
				"refactor",
				"revert",
				"style",
				// Adding missing tests or correcting existing tests
				"test",
				// Another misc change, e.g. releases or generating files
				"chore",
			],
		],
	},
} satisfies UserConfig;
