export const SEX = ["H", "M", "O"] as const
export type Sex = (typeof SEX)[number]
export const SEX_LABELS: Record<Sex, string> = { H: "Masculino", M: "Femenino", O: "Otro" }

export const ACADEMIC_PLANTA = ["adjunta", "permanente"] as const
export type AcademicPlanta = (typeof ACADEMIC_PLANTA)[number]
export const PLANTA_LABELS: Record<AcademicPlanta, string> = {
	adjunta: "Adjunta",
	permanente: "Permanente",
}

export const ACADEMIC_OPTION = ["teaching", "research"] as const
export type AcademicOption = (typeof ACADEMIC_OPTION)[number]
export const ACADEMIC_OPTION_LABELS: Record<AcademicOption, string> = {
	teaching: "Docencia",
	research: "Investigación",
}

export const ACADEMIC_SORT_FIELD = [
	"names",
	"paternal_surname",
	"maternal_surname",
	"joined_at",
	"birth_date",
] as const
export type AcademicSortField = (typeof ACADEMIC_SORT_FIELD)[number]
