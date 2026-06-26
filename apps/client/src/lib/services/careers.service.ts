import { request } from "$lib/shared/http/request"
import type { Career } from "$lib/types"

export const careersService = {
	list(params?: { department_id?: string }): Promise<Career[]> {
		return request<Career[]>({ method: "GET", url: "/careers", params })
	},
}
