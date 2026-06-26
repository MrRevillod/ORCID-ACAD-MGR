import { request } from "$lib/shared/http/request"
import type { Department } from "$lib/types"

export const departmentsService = {
	list(): Promise<Department[]> {
		return request<Department[]>({ method: "GET", url: "/departments" })
	},
}
