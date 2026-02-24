import type { Span } from "./types";

export function renderSpan(span: Span, mode: "descriptive" | "join" = "join"): string {
	const [from, to, line] = span;

	return mode === "descriptive" ? `Line ${line}, ${from}:${to}` : `${from}:${to}:${line}`;
}
