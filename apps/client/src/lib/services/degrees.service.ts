import { request } from "$lib/shared/http/request"
import type { Degree, DegreeKind } from "$lib/types"

export const degreesService = {
	listByAcademic(academicId: string): Promise<Degree[]> {
		return request<Degree[]>({ method: "GET", url: `/degrees/academic/${academicId}` })
	},

	create(data: {
		academicId: string
		name: string
		university: string
		obtainedAt: string
		kind: DegreeKind
		countryCode: string
	}): Promise<Degree> {
		return request<Degree>({ method: "POST", url: "/degrees", data })
	},

	update(
		id: string,
		data: {
			name?: string
			university?: string
			obtainedAt?: string
			countryCode?: string
		},
	): Promise<Degree> {
		return request<Degree>({ method: "PATCH", url: `/degrees/${id}`, data })
	},
}
