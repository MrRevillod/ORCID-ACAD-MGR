// @ts-expect-error this package has no types
import { getCodes } from "country-list-spanish"

function codeToEmoji(code: string): string {
	if (code.length !== 2) {
		throw new Error(`Invalid country code: ${code}`)
	}

	return String.fromCodePoint(
		...[...code].map((c) => {
			const cero_code = c.codePointAt(0)

			if (!cero_code) {
				throw new Error(`Invalid country code: ${code}`)
			}

			return 0x1f1e6 + cero_code - 65
		}),
	)
}

const raw = Object.entries(getCodes({ object: true }) as Record<string, string>)

export const countryItems = raw
	.map(([name, code]) => ({ value: code, label: `${codeToEmoji(code)} ${name}` }))
	.sort((a, b) => a.label.localeCompare(b.label, "es"))

export const countryCodeToName = Object.fromEntries(
	raw.map(([name, code]) => [code, name] as const),
)

export { codeToEmoji }
