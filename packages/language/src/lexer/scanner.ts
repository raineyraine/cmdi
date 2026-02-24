/* eslint-disable max-lines-per-function -- We'll just have to live with this */
import type { Issue, Span } from "../types";
import type { LiteralValue, RequiresValue, Token } from "./types";
import { TokenKind } from "./types";

export class Scanner {
	public hasIssue = false;
	public issues = new Array<Issue>();
	public tokens = new Array<Token>();

	private current = 0;
	private length: number;
	private line = 1;
	private start = 0;

	constructor(public readonly source: string) {
		this.length = source.size();
	}

	public scan(): void {
		this.tokens = new Array<Token>();
		this.issues = new Array<Issue>();

		while (!this.isAtEnd) {
			this.scanToken();
		}
	}

	private advance(): string {
		this.current++;
		return this.source.sub(this.current, this.current);
	}

	private isAtEnd(): boolean {
		return this.current >= this.length;
	}

	private match(char: string): boolean {
		if (this.isAtEnd()) {
			return false;
		}

		if (this.source.sub(this.current, this.current) !== char) {
			return false;
		}

		this.current++;
		return true;
	}

	private peek(): string {
		if (this.isAtEnd()) {
			return "\0";
		}

		return this.source.sub(this.current, this.current);
	}

	private peekAdvance(): string {
		if (this.isAtEnd()) {
			return "\0";
		}

		const char = this.source.sub(this.current, this.current);
		this.current++;
		return char;
	}

	private pushIssue(why: string, span: Span): void {
		this.issues.push({ span, why });
		this.hasIssue = true;
	}

	private pushToken<Kind extends Exclude<TokenKind, RequiresValue>>(kind: Kind): void {
		this.pushTokenValue(kind, undefined as never);
	}

	private pushTokenValue<Kind extends TokenKind>(kind: Kind, value: LiteralValue<Kind>): void {
		this.tokens.push({
			fullText: this.source.sub(this.start, this.current),
			kind,
			span: [this.start, this.current, this.line],
			value,
		});
	}

	private report(why: string): void {
		this.pushIssue(why, [this.start, this.current, this.line]);
	}

	private scanToken(): void {
		const char = this.advance();

		switch (char) {
			case " ":
			case "\t":
			case "\r": {
				// Ignore whitespace
				break;
			}
			case "\n": {
				this.line++;
				break;
			}
			case "!": {
				const nextChar = this.peekAdvance();

				if (nextChar === "!") {
					this.pushToken(TokenKind.BangBang);
				} else if (nextChar === "=") {
					this.pushToken(TokenKind.BangEqual);
				}

				this.advance();
				break;
			}
			case "#": {
				while (this.peek() !== "\n" && !this.isAtEnd()) {
					this.advance();
				}

				break;
			}
			case "(": {
				this.pushToken(TokenKind.OpenParentheses);
				break;
			}
			case ")": {
				this.pushToken(TokenKind.CloseParentheses);
				break;
			}
			case "*": {
				this.pushToken(TokenKind.Star);
				break;
			}
			case "+": {
				this.pushToken(TokenKind.Plus);
				break;
			}
			case "-": {
				this.pushToken(TokenKind.Minus);
				break;
			}
			case "/": {
				this.pushToken(TokenKind.Slash);
				break;
			}
			case "=": {
				this.pushToken(this.match("=") ? TokenKind.EqualEqual : TokenKind.Equal);
				break;
			}
			case "[": {
				this.pushToken(TokenKind.OpenBracket);
				break;
			}
			case "]": {
				this.pushToken(TokenKind.CloseBracket);
				break;
			}
			case "^": {
				this.pushToken(TokenKind.Up);
				break;
			}
			case "{": {
				this.pushToken(TokenKind.OpenBrace);
				break;
			}
			case "}": {
				this.pushToken(TokenKind.CloseBrace);
				break;
			}
			default: {
				this.report("Unexpected character");
			}
		}
	}
}
