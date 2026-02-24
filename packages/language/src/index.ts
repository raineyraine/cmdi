import { Scanner } from "./lexer/scanner";
import type { Token } from "./lexer/types";
import type { Issue } from "./types";

export function run(
	source: string,
): [hasIssue: boolean, issues: Array<Issue>, tokens: Array<Token>] {
	const scanner = new Scanner(source);
	scanner.scan();

	const { hasIssue, issues, tokens } = scanner;

	return [hasIssue, issues, tokens];
}

export * from "./types";
export * from "./utils";
