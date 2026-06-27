import * as v from "valibot"

import { ACADEMIC_PLANTA, type AcademicPlanta } from "$lib/academic/academics/enums"

export interface AcademicCategory {
	id: string
	name: string
	planta: AcademicPlanta
}

export const createCategorySchema = v.object({
	name: v.pipe(
		v.string(),
		v.minLength(1, "El nombre debe tener entre 1 y 255 caracteres"),
		v.maxLength(255, "El nombre debe tener entre 1 y 255 caracteres"),
	),
	planta: v.picklist(ACADEMIC_PLANTA),
})

export type CreateCategoryDto = v.InferInput<typeof createCategorySchema>
