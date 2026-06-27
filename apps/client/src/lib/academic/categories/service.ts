import { httpClient } from "$lib/shared/http/request"
import type { AcademicCategory, CreateCategoryDto } from "./dtos"

export const categoryService = {
	list(params?: { name?: string; planta?: string }): Promise<AcademicCategory[]> {
		return httpClient.request<AcademicCategory[]>({
			method: "GET",
			url: "/academic-categories",
			params,
		})
	},

	get(id: string): Promise<AcademicCategory> {
		return httpClient.request<AcademicCategory>({
			method: "GET",
			url: `/academic-categories/${id}`,
		})
	},

	create(data: CreateCategoryDto): Promise<AcademicCategory> {
		return httpClient.request<AcademicCategory>({
			method: "POST",
			url: "/academic-categories",
			data,
		})
	},
}
