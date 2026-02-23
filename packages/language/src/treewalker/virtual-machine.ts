import { Symbol } from "@rbxts/luau-polyfill";

export const None = Symbol("None");
export type None = typeof None;

export type Value =
	| ((...args: Array<unknown>) => Array<unknown>)
	| boolean
	| None
	| number
	| string;

export type Scope = ChildScope | RootScope;

interface RootScope {
	root: true;
	variables: Map<string, Value>;
}

interface ChildScope {
	root: false;
	up: Scope;
	variables: Map<string, Value>;
}

export class VirtualMachine {
	public globalScope: RootScope;
	public scopes = new Array<Scope>();

	constructor() {
		this.scopes.push({ root: true, variables: new Map() });
		// eslint-disable-next-line ts/no-non-null-assertion -- Global scope always exists here
		this.globalScope = this.scopes[0]! as RootScope;
	}

	public enterScope(): void {
		const createdScope: Scope = {
			root: false,
			up: this.getScope(),
			variables: new Map(),
		};

		this.scopes.push(createdScope);
	}

	public getVariable(key: string): Value {
		const scope = this.getScope();

		let value = scope.variables.get(key);
		let up = scope.root ? undefined : scope.up;

		while (value === undefined) {
			if (scope.root) {
				return None;
			}

			if (up) {
				value = up.variables.get(key);
				up = up.root ? undefined : up.up;
			}
		}

		return value;
	}

	public leaveScope(): void {
		const scope = this.getScope();
		if (scope.root) {
			throw "? cannot leave root scope";
		}

		this.scopes.pop();
	}

	public setGlobal(key: string, value: Value): void {
		this.globalScope.variables.set(key, value);
	}

	public setVariable(key: string, value: Value): void {
		const scope = this.getScope();

		scope.variables.set(key, value);
	}

	private getScope(): Scope {
		// eslint-disable-next-line ts/no-non-null-assertion -- last element will always exist
		return this.scopes[this.scopes.size() - 1]!;
	}
}
