import * as v from "valibot"

export interface AcademicWorkPosition {
	id: string
	name: string
}

export const createPositionSchema = v.object({
	name: v.pipe(
		v.string(),
		v.minLength(1, "El nombre debe tener entre 1 y 255 caracteres"),
		v.maxLength(255, "El nombre debe tener entre 1 y 255 caracteres"),
	),
})

export type CreatePositionDto = v.InferInput<typeof createPositionSchema>
