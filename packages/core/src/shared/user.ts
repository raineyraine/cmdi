export const ADMIN_USER = "super-user";

export type Permission = string;
export type Role = string;

export interface User {
	readonly id: string;
	readonly name: string;

	roles: Array<Role>;
}
