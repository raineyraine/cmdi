import { byte, getUtf8Size } from "./util";

export class StringReader {
	public readonly length: number;

	/** Character cursor. */
	public cursor = 0;
	public line = 1;
	/** Buffer cursor. */
	public pos = 0;

	constructor(public readonly source: buffer) {
		this.length = buffer.len(source);
	}

	public peek(offset = 0): number {
		// EOF
		if (this.pos + offset > this.length) {
			return 0;
		}

		return buffer.readu8(this.source, this.pos + offset);
	}

	public bump(): void {
		if (this.pos >= this.length) {
			return;
		}

		const readByte = buffer.readu8(this.source, this.pos);

		if (readByte === byte("\n")) {
			this.line += 1;
		}

		this.pos += getUtf8Size(readByte);
		this.cursor += 1;
	}

	public peekBump(): number {
		const peeked = this.peek();
		this.bump();
		return peeked;
	}

	public isAtEnd(): boolean {
		return this.pos >= this.length;
	}

	public reset(): void {
		this.cursor = 0;
		this.line = 1;
		this.pos = 0;
	}
}
