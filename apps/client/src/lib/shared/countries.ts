import { getCodes } from "country-list-spanish"

function codeToEmoji(code: string): string {
	return String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.codePointAt(0)! - 65))
}

const raw = Object.entries(getCodes({ object: true }) as Record<string, string>)

export const countryItems = raw
	.map(([name, code]) => ({ value: code, label: `${codeToEmoji(code)} ${name}` }))
	.sort((a, b) => a.label.localeCompare(b.label, "es"))

export const countryCodeToName = Object.fromEntries(
	raw.map(([name, code]) => [code, name] as const),
)

export { codeToEmoji }
