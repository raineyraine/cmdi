import type { Span } from "../types";

export const enum TokenKind {
	// Single Character
	CloseBrace = "}",
	CloseBracket = "]",
	CloseParentheses = ")",
	Equal = "=",
	OpenBrace = "{",
	OpenBracket = "[",
	OpenParentheses = "(",
	Semicolon = ";",

	// Operators
	// Single
	Bang = "!",
	Minus = "-",
	Plus = "+",
	Slash = "/",
	Star = "*",
	Up = "^",

	Greater = ">",
	Less = "<",

	// Double
	BangBang = "!!",
	MinusMinus = "--",
	PlusPlus = "++",
	SlashSlash = "//",

	MinusEqual = "-=",
	PlusEqual = "+=",
	SlashEqual = "/=",
	StarEqual = "*=",

	AmpersandAmpersand = "&&",
	BangEqual = "!=",
	BarBar = "||",
	EqualEqual = "==",
	GreaterEqual = ">=",
	LessEqual = "<=",

	// Triple
	SlashSlashEqual = "//=",

	// Literals
	Identifier = "identifier",
	Number = "number",
	String = "string",

	// Keywords
	FalseKeyword = "false",
	TrueKeyword = "true",

	// Misc
	EndOfFile = "eof",
	// Flag = "flag",
}

export type LiteralValue<Kind> = Kind extends TokenKind.Identifier
	? string
	: Kind extends TokenKind.Number
		? number
		: Kind extends TokenKind.String
			? string
			: undefined;

export type RequiresValue = TokenKind.Identifier | TokenKind.Number | TokenKind.String;

export interface Token<Kind = TokenKind> {
	fullText: string;
	kind: Kind;
	span: Span;

	/**
	 * The value of the token. Only exists for identifiers (name), strings
	 * (parsed value), and numbers (value).
	 */
	value: LiteralValue<Kind>;
}
