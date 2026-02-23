import { type AnyStatement, type Ast, type Expression, SyntaxKind } from "../ast/types";
import { None, type VirtualMachine } from "./virtual-machine";

export function evaluateExpression(_vm: VirtualMachine, _expression: Expression): None {
	return None;
}

export function runStatement(vm: VirtualMachine, statement: AnyStatement): void {
	switch (statement.kind) {
		case SyntaxKind.Ast:
		case SyntaxKind.Block: {
			for (const item of statement.statements) {
				runStatement(vm, item);
			}

			break;
		}
		case SyntaxKind.VariableDeclarationStatement: {
			const variableName = statement.name;
			const value = evaluateExpression(vm, statement.expression);

			vm.setVariable(variableName, value);

			break;
		}
		default: {
			print(`${statement.kind} unsupported`);
		}
	}
}

export function runTree(vm: VirtualMachine, ast: Ast): void {
	runStatement(vm, ast);
}
