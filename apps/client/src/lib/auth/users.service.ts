import { httpClient } from "$lib/shared/http/request"
import type { User, CreateUserDto, UpdateUserDto } from "./auth.dtos"

export const userService = {
	list(params?: { search?: string; role?: string }): Promise<User[]> {
		return httpClient.request<User[]>({
			method: "GET",
			url: "/users",
			params,
		})
	},

	get(id: string): Promise<User> {
		return httpClient.request<User>({
			method: "GET",
			url: `/users/${id}`,
		})
	},

	create(data: CreateUserDto): Promise<User> {
		return httpClient.request<User>({
			method: "POST",
			url: "/users",
			data,
		})
	},

	update(id: string, data: UpdateUserDto): Promise<User> {
		return httpClient.request<User>({
			method: "PUT",
			url: `/users/${id}`,
			data,
		})
	},

	delete(id: string): Promise<void> {
		return httpClient.request<void>({
			method: "DELETE",
			url: `/users/${id}`,
		})
	},
}
