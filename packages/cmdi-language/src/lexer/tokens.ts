import type { Span } from "../types";

export enum TokenKind {
	Comment = "comment",
	Error = "error",
	Whitespace = "whitespace",

	// Literals
	Identifier = "identifier",
	NumericLiteral = "number",
	StringLiteral = "string",
}
export type LiteralTokenKinds = TokenKind.NumericLiteral | TokenKind.StringLiteral;

export interface SimpleToken<T extends TokenKind = TokenKind> {
	readonly fullText: string;
	readonly kind: T;
	readonly span: Span;
}

export interface NumericLiteralToken extends SimpleToken<TokenKind.NumericLiteral> {
	readonly literal: number;
}

export interface StringLiteralToken extends SimpleToken<TokenKind.StringLiteral> {
	readonly literal: string;
}

export type Token =
	| NumericLiteralToken
	| SimpleToken<Exclude<TokenKind, LiteralTokenKinds>>
	| StringLiteralToken;
