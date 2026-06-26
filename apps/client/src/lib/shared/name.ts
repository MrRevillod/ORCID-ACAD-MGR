export const formatName = (names: string, paternalSurname: string, maternalSurname: string) => {
	const splittedNames = names.split(" ")

	const name = toPascalCase(splittedNames[0])
	const paternal = toPascalCase(paternalSurname)
	const maternal = toPascalCase(maternalSurname)

	return `${name} ${paternal} ${maternal}`
}

const toPascalCase = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
