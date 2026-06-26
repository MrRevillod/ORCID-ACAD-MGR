export class CLf64Value {
	private constructor(private readonly value: number) {}

	static from(value?: number | null): CLf64Value | null {
		if (typeof value !== "number") return null
		if (!Number.isFinite(value)) return null
		return new CLf64Value(value)
	}

	static format(value?: number | null, opts?: { min?: number; max?: number }): string {
		const v = CLf64Value.from(value)
		if (!v) return "--"
		return v.toDisplay(opts)
	}

	toDisplay(opts?: { min?: number; max?: number }): string {
		return this.value.toLocaleString("es-CL", {
			minimumFractionDigits: opts?.min ?? 1,
			maximumFractionDigits: opts?.max ?? 2,
		})
	}
}
