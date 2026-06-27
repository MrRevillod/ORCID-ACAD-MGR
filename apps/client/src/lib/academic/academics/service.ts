import { httpClient } from "$lib/shared/http/request"
import type { Academic, UpdateAcademicDto, CreateAcademicDto, GetAcademicsParams } from "./dtos"

export const academicService = {
	list(params?: GetAcademicsParams): Promise<Academic[]> {
		return httpClient.request<Academic[]>({
			method: "GET",
			url: "/academics",
			params,
		})
	},

	get(id: string): Promise<Academic> {
		return httpClient.request<Academic>({
			method: "GET",
			url: `/academics/${id}`,
		})
	},

	create(data: CreateAcademicDto): Promise<Academic> {
		return httpClient.request<Academic>({
			method: "POST",
			url: "/academics",
			data,
		})
	},

	update(id: string, data: UpdateAcademicDto): Promise<Academic> {
		return httpClient.request<Academic>({
			method: "PATCH",
			url: `/academics/${id}`,
			data,
		})
	},

	async import(file: File): Promise<void> {
		const formData = new FormData()
		formData.append("file", file)

		return httpClient.request<void>({
			method: "POST",
			url: "/academics/import",
			data: formData,
		})
	},
}
