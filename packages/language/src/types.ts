export type Span = [from: number, to: number, line: number];
export interface Issue {
	span: Span;
	why?: string;
}
