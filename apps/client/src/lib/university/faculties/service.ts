import { httpClient } from "$lib/shared/http/request"
import type { Faculty } from "./dtos"

export const facultyService = {
	list(): Promise<Faculty[]> {
		return httpClient.request<Faculty[]>({ method: "GET", url: "/faculties" })
	},
}
