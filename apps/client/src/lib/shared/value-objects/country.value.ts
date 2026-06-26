import { countryCodeToName, codeToEmoji } from "$lib/shared/countries"

export class CountryValue {
	private readonly name?: string
	private readonly flag?: string

	private constructor(public readonly code: string) {
		this.name = countryCodeToName[code]
		this.flag = codeToEmoji(code)
	}

	static from(value?: string | null): CountryValue | null {
		if (typeof value !== "string") return null
		if (!/^[A-Z]{2}$/.test(value)) return null
		if (!(value in countryCodeToName)) return null

		return new CountryValue(value)
	}

	static format(value?: string | null): string {
		const cv = CountryValue.from(value)
		if (!cv) return "--"

		return cv.toDisplay()
	}

	toDisplay(): string {
		if (!this.name || !this.flag) return "--"
		return `${this.flag} ${this.name}`
	}
}
