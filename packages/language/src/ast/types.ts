import type { Span } from "../types";

export const enum SyntaxKind {
	EndOfFileToken,
	Ast,

	// Statements
	VariableDeclarationStatement,
	IfStatement,

	// Expressions
	EvaluationExpression,

	// Block Structure
	Block,
}

export interface Node {
	readonly kind: SyntaxKind;
	readonly span: Span;
}

export interface Block extends Node {
	readonly kind: SyntaxKind.Block;
	readonly statements: Array<AnyStatement>;
}

export interface Ast extends Node {
	readonly kind: SyntaxKind.Ast;
	readonly statements: Array<AnyStatement>;
}

// Expresions
export interface Expression extends Node {
	/** @deprecated */
	readonly __expressionBrand: unique symbol;
}

/** An expression that evaluates its contents. */
export interface EvaluationExpression extends Expression {
	readonly expression: AnyExpression;
	readonly kind: SyntaxKind.EvaluationExpression;
}

// Statements
export interface Statement extends Node {
	/** @deprecated */
	readonly __statementBrand: unique symbol;
}

export interface IfStatement extends Statement {
	readonly elseBlock?: Block;

	readonly elseIfStatements?: Array<ElseIfStatement>;
	readonly kind: SyntaxKind.IfStatement;
}

export interface ElseIfStatement extends IfStatement {
	readonly elseBlock: never;
}

export interface VariableDeclarationStatement extends Statement {
	readonly name: string;
	readonly expression: AnyExpression;
	readonly kind: SyntaxKind.VariableDeclarationStatement;
}

export type AnyExpression = EvaluationExpression;
export type AnyBlock = Ast | Block;
export type AnyStatement = Ast | Block | IfStatement | VariableDeclarationStatement;
export type AnyNode = AnyBlock | AnyExpression | IfStatement;
