<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query"
	import { optionService } from "$lib/academic/options/service"
	import { categoryService } from "$lib/academic/categories/service"
	import OptionDialog from "$lib/academic/options/components/option-dialog.svelte"
	import Button from "$lib/shared/components/ui/button.svelte"
	import Badge from "$lib/shared/components/ui/badge.svelte"
	import { Plus, Loader2, Trash2 } from "@lucide/svelte"
	import { ACADEMIC_OPTION_LABELS } from "$lib/academic/academics/enums"

	const query = createQuery(() => ({
		queryKey: ["admin", "options"],
		queryFn: () => optionService.list(),
	}))

	const categoriesQuery = createQuery(() => ({
		queryKey: ["admin", "categories"],
		queryFn: () => categoryService.list(),
	}))

	const categories = $derived(categoriesQuery.data ?? [])
	const categoryMap = $derived(Object.fromEntries(categories.map((c) => [c.id, c.name])))

	let showCreate = $state(false)
</script>

<div>
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-lg font-semibold text-[#1A1A1A]">Opciones de Categoría</h1>
			<p class="mt-1 text-sm text-corp-gray">Gestiona las opciones válidas por categoría.</p>
		</div>
		<Button onclick={() => (showCreate = true)}>
			<Plus class="size-4" />
			Nueva
		</Button>
	</div>

	{#if query.isPending}
		<div class="flex items-center justify-center py-16">
			<Loader2 class="size-6 animate-spin text-corp-gray" />
		</div>
	{:else}
		<div class="rounded-xl border border-corp-gray/20 bg-white">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-corp-gray/10 bg-gray-100">
						<th
							class="px-4 py-3 text-left text-xs font-medium tracking-wide uppercase text-corp-gray"
							>Categoría</th
						>
						<th
							class="px-4 py-3 text-left text-xs font-medium tracking-wide uppercase text-corp-gray"
							>Opción</th
						>
						<th
							class="px-4 py-3 text-left text-xs font-medium tracking-wide uppercase text-corp-gray"
							>Horas</th
						>
						<th class="px-4 py-3 w-16"></th>
					</tr>
				</thead>
				<tbody>
					{#each query.data ?? [] as opt (opt.id)}
						<tr class="border-b border-corp-gray/10 even:bg-gray-50 last:border-0">
							<td class="px-4 py-3 text-[#1A1A1A]"
								>{categoryMap[opt.categoryId] ?? opt.categoryId}</td
							>
							<td class="px-4 py-3">
								<Badge variant={opt.option === "research" ? "advanced" : "base"}>
									{ACADEMIC_OPTION_LABELS[opt.option]}
								</Badge>
							</td>
							<td class="px-4 py-3 text-corp-gray">{opt.hours?.toLocaleString("es-CL") ?? "—"}</td>
							<td class="px-4 py-3">
								<button
									class="flex size-8 items-center justify-center rounded-lg text-corp-gray transition-colors hover:bg-red-50 hover:text-red-600"
								>
									<Trash2 class="size-4" />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if (query.data ?? []).length === 0}
				<p class="px-4 py-8 text-center text-sm text-corp-gray">No hay opciones registradas.</p>
			{/if}
		</div>
	{/if}
</div>

<OptionDialog bind:open={showCreate} onClose={() => (showCreate = false)} />
