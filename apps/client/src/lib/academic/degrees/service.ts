import { httpClient } from "$lib/shared/http/request"
import type { Degree, CreateDegreeDto, UpdateDegreeDto } from "./dtos"

export const degreeService = {
	listByAcademic(academicId: string): Promise<Degree[]> {
		return httpClient.request<Degree[]>({
			method: "GET",
			url: `/degrees/academic/${academicId}`,
		})
	},

	create(data: CreateDegreeDto): Promise<Degree> {
		return httpClient.request<Degree>({
			method: "POST",
			url: "/degrees",
			data,
		})
	},

	update(id: string, data: UpdateDegreeDto): Promise<Degree> {
		return httpClient.request<Degree>({
			method: "PATCH",
			url: `/degrees/${id}`,
			data,
		})
	},
}
