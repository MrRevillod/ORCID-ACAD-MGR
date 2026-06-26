import * as v from "valibot"

export type User = {
	id: string
	name: string
	email: string
	role: "admin"
}

export const loginSchema = v.object({
	email: v.pipe(v.string(), v.email("El correo electrónico no es válido.")),
	password: v.pipe(v.string(), v.minLength(1, "La contraseña es obligatoria.")),
})

export type LoginInput = v.InferInput<typeof loginSchema>
