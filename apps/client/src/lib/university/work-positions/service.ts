import { httpClient } from "$lib/shared/http/request"
import type { AcademicWorkPosition, CreatePositionDto } from "./dtos"

export const positionService = {
	list(params?: { name?: string }): Promise<AcademicWorkPosition[]> {
		return httpClient.request<AcademicWorkPosition[]>({
			method: "GET",
			url: "/work-positions",
			params,
		})
	},

	create(data: CreatePositionDto): Promise<AcademicWorkPosition> {
		return httpClient.request<AcademicWorkPosition>({
			method: "POST",
			url: "/work-positions",
			data,
		})
	},
}
