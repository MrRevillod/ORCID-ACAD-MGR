import { httpClient } from "$lib/shared/http/request"
import type { AcademicCategoryOption, CreateOptionDto } from "./dtos"

export const optionService = {
	list(params?: { category_id?: string }): Promise<AcademicCategoryOption[]> {
		return httpClient.request<AcademicCategoryOption[]>({
			method: "GET",
			url: "/category-options",
			params,
		})
	},

	get(id: string): Promise<AcademicCategoryOption> {
		return httpClient.request<AcademicCategoryOption>({
			method: "GET",
			url: `/category-options/${id}`,
		})
	},

	create(data: CreateOptionDto): Promise<AcademicCategoryOption> {
		return httpClient.request<AcademicCategoryOption>({
			method: "POST",
			url: "/category-options",
			data,
		})
	},
}
