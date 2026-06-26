<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query"
	import { goto } from "$app/navigation"
	import { resolve } from "$app/paths"
	import { Search, Loader2, AlertCircle, RotateCcw } from "@lucide/svelte"
	import { createColumnHelper, type TableFeatures } from "@tanstack/svelte-table"
	import { academicsService, type GetAcademicsParams } from "$lib/services/academics.service"
	import { departmentsService } from "$lib/services/departments.service"
	import { careersService } from "$lib/services/careers.service"
	import { categoriesService } from "$lib/services/categories.service"
	import DataTable from "$lib/components/ui/data-table.svelte"
	import Select from "$lib/components/ui/select.svelte"
	import Label from "$lib/components/ui/label.svelte"
	import Button from "$lib/components/ui/button.svelte"
	import type { AcademicView } from "$lib/types"
	import { formatName } from "$lib/shared/name"

	const departmentsQuery = createQuery(() => ({
		queryKey: ["departments"],
		queryFn: () => departmentsService.list(),
	}))

	const careersQuery = createQuery(() => ({
		queryKey: ["careers"],
		queryFn: () => careersService.list(),
	}))

	const categoriesQuery = createQuery(() => ({
		queryKey: ["categories"],
		queryFn: () => categoriesService.list(),
	}))

	let searchInput = $state("")
	let debouncedSearch = $state("")
	let deptFilter = $state("")
	let careerFilter = $state("")
	let catFilter = $state("")
	let plantaFilter = $state("")
	let optionFilter = $state("")

	$effect(() => {
		const value = searchInput
		const timer = setTimeout(() => (debouncedSearch = value), 300)
		return () => clearTimeout(timer)
	})

	let filters = $derived<GetAcademicsParams>({
		...(debouncedSearch && { search: debouncedSearch }),
		...(deptFilter && { department_id: deptFilter }),
		...(careerFilter && { career_id: careerFilter }),
		...(catFilter && { category_id: catFilter }),
		...(plantaFilter && { planta: plantaFilter as GetAcademicsParams["planta"] }),
		...(optionFilter && { option: optionFilter as GetAcademicsParams["option"] }),
	})

	function clearFilters() {
		searchInput = ""
		debouncedSearch = ""
		deptFilter = ""
		careerFilter = ""
		catFilter = ""
		plantaFilter = ""
		optionFilter = ""
	}

	const query = createQuery(() => ({
		queryKey: ["academics", filters],
		queryFn: () => academicsService.list(filters),
	}))

	const deptItems = $derived([
		{ value: "", label: "Todos" },
		...(departmentsQuery.data?.map((d) => ({ value: d.id, label: d.name })) ?? []),
	])

	const careerItems = $derived([
		{ value: "", label: "Todas" },
		...(careersQuery.data ?? [])
			.filter((c) => !deptFilter || c.departmentId === deptFilter)
			.map((c) => ({ value: c.id, label: c.name })),
	])

	const catItems = $derived([
		{ value: "", label: "Todas" },
		...(categoriesQuery.data?.map((c) => ({ value: c.id, label: c.name })) ?? []),
	])

	const plantaItems = [
		{ value: "", label: "Todas" },
		{ value: "adjunta", label: "Adjunta" },
		{ value: "permanente", label: "Permanente" },
	]

	const optionItems = [
		{ value: "", label: "Todas" },
		{ value: "teaching", label: "Docencia" },
		{ value: "research", label: "Investigación" },
	]

	const helper = createColumnHelper<TableFeatures, AcademicView>()

	const columns = [
		helper.accessor((row) => formatName(row.names, row.paternalSurname, row.maternalSurname), {
			id: "name",
			header: "Nombre",
		}),
		helper.accessor("email", { header: "Email" }),
		helper.accessor("department", { header: "Departamento" }),
		helper.accessor("category", { header: "Categoría" }),
		helper.accessor(
			(row) => {
				switch (row.planta) {
					case "adjunta":
						return "Adjunta"
					case "permanente":
						return "Permanente"
				}
			},
			{
				id: "planta",
				header: "Planta",
			},
		),
		helper.accessor(
			(row) => {
				switch (row.option) {
					case "teaching":
						return "Docencia"
					case "research":
						return "Investigación"
				}
			},
			{
				id: "option",
				header: "Opción",
			},
		),
	]
</script>

<div class="mx-auto flex h-full max-w-[1600px] flex-col px-4 py-8 sm:px-6 lg:px-8">
	<div class="flex min-h-0 flex-1 gap-8">
		<aside class="hidden w-72 shrink-0 overflow-y-auto rounded-xl bg-white p-4 lg:block">
			<h1 class="text-lg font-semibold text-[#1A1A1A]">Académicos</h1>
			<p class="mt-1 text-sm text-corp-gray">Facultad de Ingeniería</p>

			<div class="relative mt-6">
				<Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-corp-gray/50" />
				<input
					type="text"
					bind:value={searchInput}
					placeholder="Buscar académico..."
					class="h-10 w-full rounded-lg border border-corp-gray/20 bg-white pl-10 pr-3 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-corp-gray/50 focus:border-corp-blue/50 focus:ring-2 focus:ring-corp-blue/10"
				/>
			</div>

			<div class="mt-6 space-y-4">
				<div class="space-y-2.5">
					<Label>Departamento</Label>
					<Select items={deptItems} bind:value={deptFilter} placeholder="Todos" />
				</div>
				<div class="space-y-2.5">
					<Label>Carrera</Label>
					<Select items={careerItems} bind:value={careerFilter} placeholder="Todas" />
				</div>
				<div class="space-y-2.5">
					<Label>Categoría</Label>
					<Select items={catItems} bind:value={catFilter} placeholder="Todas" />
				</div>
				<div class="space-y-2.5">
					<Label>Planta</Label>
					<Select items={plantaItems} bind:value={plantaFilter} placeholder="Todas" />
				</div>
				<div class="space-y-2.5">
					<Label>Opción</Label>
					<Select items={optionItems} bind:value={optionFilter} placeholder="Todas" />
				</div>
			</div>

			<Button variant="secondary" class="mt-6 w-full" onclick={clearFilters}>
				<RotateCcw class="size-4" />
				Limpiar filtros
			</Button>
		</aside>

		<main class="min-w-0 flex-1 overflow-y-auto">
			{#if query.isPending}
				<div class="flex items-center justify-center py-16">
					<Loader2 class="size-6 animate-spin text-corp-gray" />
				</div>
			{:else if query.isError}
				<div class="flex flex-col items-center justify-center py-16 text-center">
					<AlertCircle class="size-8 text-red-500" />
					<p class="mt-3 text-sm text-corp-gray">Error al cargar los académicos.</p>
				</div>
			{:else}
				<DataTable
					data={query.data ?? []}
					{columns}
					onRowClick={(row: AcademicView) => void goto(resolve(`/academics/${row.id}`))}
				/>
			{/if}
		</main>
	</div>
</div>
