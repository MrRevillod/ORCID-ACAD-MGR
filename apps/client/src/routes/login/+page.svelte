<script lang="ts">
	import * as v from "valibot"
	import { loginSchema, type LoginInput } from "$lib/auth/auth.dtos"

	import { createMutation } from "@tanstack/svelte-query"
	import { goto } from "$app/navigation"
	import { resolve } from "$app/paths"
	import { toast } from "svelte-sonner"
	import { LogIn, Eye, EyeOff } from "@lucide/svelte"
	import { authService } from "$lib/auth/auth.service"
	import { authStore } from "$lib/auth/auth.store.svelte"
	import type { ApiResponse } from "$lib/shared/http/response"

	let email = $state("")
	let password = $state("")
	let showPassword = $state(false)
	let errors = $state<Record<string, string>>({})

	const loginMutation = createMutation(() => ({
		mutationFn: (payload: LoginInput) => authService.login(payload),
		onSuccess: async (user) => {
			authStore.setSession(user)
			password = ""
			await goto(resolve("/"))
		},
		onError: (error: ApiResponse) => {
			toast.error(error.message ?? "Error al iniciar sesión")
		},
	}))

	const loading = $derived(loginMutation.isPending)

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault()
		errors = {}

		const result = v.safeParse(loginSchema, { email, password })

		if (!result.success) {
			const flat = v.flatten(result.issues)
			if (flat.nested) {
				for (const [key, msgs] of Object.entries(flat.nested)) {
					if (msgs?.length) errors[key] = msgs[0]
				}
			}
			return
		}

		await loginMutation.mutateAsync(result.output)
	}
</script>

<div class="flex h-full items-center justify-center px-4 py-8">
	<section class="w-full max-w-sm rounded-xl bg-white p-6">
		<div class="mb-8 text-center">
			<h1 class="text-lg font-semibold text-[#1A1A1A]">Iniciar sesión</h1>
			<p class="mt-1 text-sm text-corp-gray">
				Ingresa a la web de Administración de la Plataforma.
			</p>
		</div>

		<form class="grid gap-5" onsubmit={handleSubmit}>
			<label class="grid gap-1.5">
				<span class="text-xs font-medium tracking-wide uppercase text-corp-gray"
					>Correo electrónico</span
				>
				<div class="relative">
					<input
						class="h-10 w-full rounded-lg border bg-white px-3 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-corp-gray/50 focus:border-corp-blue/50 focus:ring-2 focus:ring-corp-blue/10 {errors.email
							? 'border-red-500'
							: 'border-corp-gray/20'}"
						type="text"
						bind:value={email}
						autocomplete="email"
						placeholder="jdoe@domain.com"
					/>
				</div>
				{#if errors.email}
					<p class="text-xs text-red-600">{errors.email}</p>
				{/if}
			</label>

			<label class="grid gap-1.5">
				<span class="text-xs font-medium tracking-wide uppercase text-corp-gray">Contraseña</span>
				<div class="relative">
					<input
						class="h-10 w-full rounded-lg border bg-white pl-3 pr-10 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-corp-gray/50 focus:border-corp-blue/50 focus:ring-2 focus:ring-corp-blue/10 {errors.password
							? 'border-red-500'
							: 'border-corp-gray/20'}"
						type={showPassword ? "text" : "password"}
						bind:value={password}
						autocomplete="current-password"
						placeholder="••••••••"
					/>
					<button
						type="button"
						class="absolute right-2.5 top-1/2 -translate-y-1/2 text-corp-gray/50 transition-colors hover:text-corp-gray"
						onclick={() => (showPassword = !showPassword)}
						tabindex={-1}
					>
						{#if showPassword}
							<EyeOff class="size-4" />
						{:else}
							<Eye class="size-4" />
						{/if}
					</button>
				</div>
				{#if errors.password}
					<p class="text-xs text-red-600">{errors.password}</p>
				{/if}
			</label>

			<button
				class="mt-2 flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-corp-blue px-4 text-sm font-medium text-white outline-none transition-colors hover:bg-corp-blue/90 focus:ring-2 focus:ring-corp-blue/30 disabled:cursor-not-allowed disabled:opacity-50"
				type="submit"
				disabled={loading}
			>
				<LogIn size={16} aria-hidden="true" />
				{loading ? "Ingresando..." : "Ingresar"}
			</button>
		</form>

		<p class="mt-6 text-center text-sm text-corp-gray">
			<a
				class="font-medium text-corp-blue underline decoration-corp-blue/30 underline-offset-3 hover:decoration-corp-blue/60"
				href="https://chpass.inf.uct.cl"
				target="_blank"
				rel="noopener noreferrer"
			>
				¿Olvidaste tu contraseña?
			</a>
		</p>
	</section>
</div>
