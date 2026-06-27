import * as v from "valibot"

export type UserRole = "admin"

export type User = {
	id: string
	name: string
	email: string
	role: UserRole
}

export const loginSchema = v.object({
	email: v.pipe(
		v.string(),
		v.minLength(1, "El correo electrónico es obligatorio."),
		v.maxLength(255, "El correo electrónico no puede tener más de 255 caracteres."),
		v.email("El correo electrónico no es válido."),
	),
	password: v.pipe(
		v.string(),
		v.minLength(1, "La contraseña es obligatoria."),
		v.maxLength(255, "La contraseña no puede tener más de 255 caracteres."),
	),
})

export type LoginInput = v.InferInput<typeof loginSchema>

const validatePassword = (pw: string) => {
	const missing: string[] = []
	if (pw.length < 8) missing.push("al menos 8 caracteres")
	if (!/[a-z]/.test(pw)) missing.push("una minúscula")
	if (!/[A-Z]/.test(pw)) missing.push("una mayúscula")
	if (!/[0-9]/.test(pw)) missing.push("un número")
	if (!/[^a-zA-Z0-9]/.test(pw)) missing.push("un carácter especial")
	if (pw.length > 255) missing.push("máximo 255 caracteres")
	if (missing.length > 0) {
		return `La contraseña debe tener ${missing.join(", ")}`
	}
	return null
}

export const createUserSchema = v.object({
	name: v.pipe(
		v.string(),
		v.minLength(1, "El nombre es obligatorio"),
		v.maxLength(255, "El nombre no puede tener más de 255 caracteres"),
	),
	email: v.pipe(v.string(), v.email("El correo electrónico no es válido")),
	password: v.pipe(
		v.string(),
		v.check(
			(pw) => !validatePassword(pw),
			"Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
		),
	),
	role: v.picklist(["admin"] as const),
})

export type CreateUserDto = v.InferInput<typeof createUserSchema>

export const updateUserSchema = v.object({
	name: v.optional(
		v.pipe(
			v.string(),
			v.minLength(1, "El nombre es obligatorio"),
			v.maxLength(255, "El nombre no puede tener más de 255 caracteres"),
		),
	),
	email: v.optional(v.pipe(v.string(), v.email("El correo electrónico no es válido"))),
	password: v.optional(
		v.pipe(
			v.string(),
			v.check(
				(pw) => !validatePassword(pw),
				"Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
			),
		),
	),
	role: v.optional(v.picklist(["admin"] as const)),
})

export type UpdateUserDto = v.InferInput<typeof updateUserSchema>
