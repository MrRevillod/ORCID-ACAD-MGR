import { httpClient } from "$lib/shared/http/request"
import type { Career } from "./dtos"

export const careerService = {
	list(params?: { department_id?: string }): Promise<Career[]> {
		return httpClient.request<Career[]>({ method: "GET", url: "/careers", params })
	},
}
