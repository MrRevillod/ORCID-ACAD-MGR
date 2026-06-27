import { httpClient } from "$lib/shared/http/request"
import type { Department } from "./dtos"

export const departmentService = {
	list(): Promise<Department[]> {
		return httpClient.request<Department[]>({ method: "GET", url: "/departments" })
	},
}
