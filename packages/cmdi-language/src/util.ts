export function getUtf8Size(firstByte: number): number {
	if (firstByte < 0x80) {
		return 1;
	}

	if (firstByte < 0xe0) {
		return 2;
	}

	if (firstByte < 0xf0) {
		return 3;
	}

	return 4;
}

export function byte(character: string): number {
	return utf8.codepoint(character)[0] as number;
}

export function char(codepoint: number): string {
	return utf8.char(codepoint);
}
