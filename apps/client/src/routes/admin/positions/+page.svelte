<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query"
	import { positionService } from "$lib/university/work-positions/service"
	import PositionDialog from "$lib/university/work-positions/components/position-dialog.svelte"
	import Button from "$lib/shared/components/ui/button.svelte"
	import { Plus, Loader2, Trash2 } from "@lucide/svelte"

	const query = createQuery(() => ({
		queryKey: ["admin", "positions"],
		queryFn: () => positionService.list(),
	}))

	let showCreate = $state(false)
</script>

<div>
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-lg font-semibold text-[#1A1A1A]">Cargos Laborales</h1>
			<p class="mt-1 text-sm text-corp-gray">Gestiona los cargos laborales de los académicos.</p>
		</div>
		<Button onclick={() => (showCreate = true)}>
			<Plus class="size-4" />
			Nuevo
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
						<th class="px-4 py-3 w-16"></th>
					</tr>
				</thead>
				<tbody>
					{#each query.data ?? [] as pos (pos.id)}
						<tr class="border-b border-corp-gray/10 even:bg-gray-50 last:border-0">
							<td class="px-4 py-3 text-[#1A1A1A]">{pos.name}</td>
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
				<p class="px-4 py-8 text-center text-sm text-corp-gray">No hay cargos registrados.</p>
			{/if}
		</div>
	{/if}
</div>

<PositionDialog bind:open={showCreate} onClose={() => (showCreate = false)} />
