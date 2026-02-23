import type { Ast } from "./ast/types";
import { runTree, VirtualMachine } from "./treewalker";

export * from "./lexer";
export * from "./treewalker";
export * from "./types";

export function run(tree: Ast): void {
	const vm = new VirtualMachine();

	runTree(vm, tree);
}
