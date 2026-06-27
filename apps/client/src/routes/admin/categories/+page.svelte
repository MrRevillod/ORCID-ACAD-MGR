<script lang="ts">
	import {
		createQuery,
		createMutation as createTanMutation,
		useQueryClient,
	} from "@tanstack/svelte-query"
	import { categoryService } from "$lib/academic/categories/service"
	import CategoryDialog from "$lib/academic/categories/components/category-dialog.svelte"
	import Button from "$lib/shared/components/ui/button.svelte"
	import Badge from "$lib/shared/components/ui/badge.svelte"
	import { Plus, Loader2, Trash2 } from "@lucide/svelte"

	const queryClient = useQueryClient()

	const query = createQuery(() => ({
		queryKey: ["admin", "categories"],
		queryFn: () => categoryService.list(),
	}))

	let showCreate = $state(false)

	const deleteCat = createTanMutation(() => ({
		mutationFn: (_id: string) => Promise.resolve(),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["admin", "categories"] })
		},
	}))
</script>

<div>
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-lg font-semibold text-[#1A1A1A]">Categorías Académicas</h1>
			<p class="mt-1 text-sm text-corp-gray">Gestiona las categorías académicas por planta.</p>
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
							>Nombre</th
						>
						<th
							class="px-4 py-3 text-left text-xs font-medium tracking-wide uppercase text-corp-gray"
							>Planta</th
						>
						<th class="px-4 py-3 w-16"></th>
					</tr>
				</thead>
				<tbody>
					{#each query.data ?? [] as cat (cat.id)}
						<tr class="border-b border-corp-gray/10 even:bg-gray-50 last:border-0">
							<td class="px-4 py-3 text-[#1A1A1A]">{cat.name}</td>
							<td class="px-4 py-3">
								<Badge variant={cat.planta === "permanente" ? "advanced" : "base"}>
									{cat.planta === "permanente" ? "Permanente" : "Adjunta"}
								</Badge>
							</td>
							<td class="px-4 py-3">
								<button
									class="flex size-8 items-center justify-center rounded-lg text-corp-gray transition-colors hover:bg-red-50 hover:text-red-600"
									onclick={() => deleteCat.mutate(cat.id)}
								>
									<Trash2 class="size-4" />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if (query.data ?? []).length === 0}
				<p class="px-4 py-8 text-center text-sm text-corp-gray">No hay categorías registradas.</p>
			{/if}
		</div>
	{/if}
</div>

<CategoryDialog bind:open={showCreate} onClose={() => (showCreate = false)} />
