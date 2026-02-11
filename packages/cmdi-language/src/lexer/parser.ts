import type { StringReader } from "../reader";
import { byte } from "../util";
import { type Token, TokenKind } from "./tokens";

export function lexBuffer(reader: StringReader): Array<Token> {
	reader.reset();

	function parseComment(): TokenKind {
		const startLine = reader.line;

		while (reader.line === startLine) {
			reader.bump();
		}

		return TokenKind.Comment;
	}

	function readKind(): [kind: TokenKind, literal?: unknown] {
		let char = reader.peek();

		switch (char) {
			case byte("#"): {
				return [parseComment()];
			}
		}

		return [TokenKind.Error];
	}

	const tokens = new Array<Token>();

	while (reader.pos < reader.length) {
		const start = reader.pos;
		const [kind, literal] = readKind();
		const ended = reader.pos;

		const fullText = buffer.readstring(reader.source, start, ended - start);

		return {};
	}

	return tokens;
}
