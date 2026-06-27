export const DEGREE_KIND = ["base", "advanced"] as const

export type DegreeKind = (typeof DEGREE_KIND)[number]

export const DEGREE_KIND_LABELS: Record<DegreeKind, string> = {
	base: "Título Profesional",
	advanced: "Grado Académico",
}
