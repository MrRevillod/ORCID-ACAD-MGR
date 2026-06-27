<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query"
	import { page } from "$app/state"
	import { goto } from "$app/navigation"
	import { resolve } from "$app/paths"
	import { Loader2, AlertCircle } from "@lucide/svelte"
	import { createColumnHelper, type TableFeatures } from "@tanstack/svelte-table"
	import { academicService } from "$lib/academic/academics/service"
	import { departmentService } from "$lib/university/departments/service"
	import { careerService } from "$lib/university/careers/service"
	import { categoryService } from "$lib/academic/categories/service"
	import DataTable from "$lib/shared/components/ui/data-table.svelte"
	import AcademicsFilters from "$lib/academic/academics/components/academics-filters.svelte"
	import AcademicCreateDialog from "$lib/academic/academics/components/academic-create-dialog.svelte"
	import type { Academic, GetAcademicsParams } from "$lib/academic/academics/dtos"
	import { PLANTA_LABELS, ACADEMIC_OPTION_LABELS } from "$lib/academic/academics/enums"
	import { FullName } from "$lib/shared/value-objects/full-name.value"

	let searchInput = $state(page.url.searchParams.get("search") ?? "")
	let deptFilter = $state(page.url.searchParams.get("department_id") ?? "")
	let careerFilter = $state(page.url.searchParams.get("career_id") ?? "")
	let catFilter = $state(page.url.searchParams.get("category_id") ?? "")
	let plantaFilter = $state(page.url.searchParams.get("planta") ?? "")
	let optionFilter = $state(page.url.searchParams.get("option") ?? "")

	const departmentsQuery = createQuery(() => ({
		queryKey: ["departments"],
		queryFn: () => departmentService.list(),
	}))

	const careersQuery = createQuery(() => ({
		queryKey: ["careers", deptFilter],
		queryFn: () => careerService.list(deptFilter ? { department_id: deptFilter } : undefined),
	}))

	const categoriesQuery = createQuery(() => ({
		queryKey: ["categories"],
		queryFn: () => categoryService.list(),
	}))

	$effect(() => {
		const sp = page.url.searchParams
		const urlSearch = sp.get("search") ?? ""
		if (urlSearch !== searchInput) searchInput = urlSearch
		deptFilter = sp.get("department_id") ?? ""
		careerFilter = sp.get("career_id") ?? ""
		catFilter = sp.get("category_id") ?? ""
		plantaFilter = sp.get("planta") ?? ""
		optionFilter = sp.get("option") ?? ""
	})

	$effect(() => {
		const value = searchInput
		const timer = setTimeout(() => {
			const url = new URL(page.url)
			if (value) url.searchParams.set("search", value)
			else url.searchParams.delete("search")
			if (url.href !== page.url.href) {
				void goto(url, { replaceState: true, noScroll: true })
			}
		}, 300)
		return () => clearTimeout(timer)
	})

	$effect(() => {
		const url = new URL(page.url)
		if (deptFilter) url.searchParams.set("department_id", deptFilter)
		else url.searchParams.delete("department_id")
		if (careerFilter) url.searchParams.set("career_id", careerFilter)
		else url.searchParams.delete("career_id")
		if (catFilter) url.searchParams.set("category_id", catFilter)
		else url.searchParams.delete("category_id")
		if (plantaFilter) url.searchParams.set("planta", plantaFilter)
		else url.searchParams.delete("planta")
		if (optionFilter) url.searchParams.set("option", optionFilter)
		else url.searchParams.delete("option")
		if (url.href !== page.url.href) {
			void goto(url, { replaceState: true, noScroll: true })
		}
	})

	let filters = $derived<GetAcademicsParams>({
		...(searchInput && { search: searchInput }),
		...(deptFilter && { department_id: deptFilter }),
		...(careerFilter && { career_id: careerFilter }),
		...(catFilter && { category_id: catFilter }),
		...(plantaFilter && { planta: plantaFilter as GetAcademicsParams["planta"] }),
		...(optionFilter && { option: optionFilter as GetAcademicsParams["option"] }),
	})

	let showCreateDialog = $state(false)

	function clearFilters() {
		void goto(resolve("/academics"), { replaceState: true, noScroll: true })
	}

	const query = createQuery(() => ({
		queryKey: ["academics", filters],
		queryFn: () => academicService.list(filters),
	}))

	const helper = createColumnHelper<TableFeatures, Academic>()

	const columns = [
		helper.accessor(
			(row) => FullName.of(row.names, row.paternalSurname, row.maternalSurname).format(),
			{
				id: "name",
				header: "Nombre",
			},
		),
		helper.accessor("email", { header: "Email" }),
		helper.accessor("department", { header: "Departamento" }),
		helper.accessor("category", { header: "Categoría" }),
		helper.accessor((row) => PLANTA_LABELS[row.planta], {
			id: "planta",
			header: "Planta",
		}),
		helper.accessor((row) => ACADEMIC_OPTION_LABELS[row.option], {
			id: "option",
			header: "Opción",
		}),
	]
</script>

<div class="mx-auto flex h-full max-w-[1600px] flex-col px-4 py-8 sm:px-6 lg:px-8">
	<div class="flex min-h-0 flex-1 gap-8">
		<AcademicsFilters
			bind:search={searchInput}
			bind:deptFilter
			bind:careerFilter
			bind:catFilter
			bind:plantaFilter
			bind:optionFilter
			departments={departmentsQuery.data}
			careers={careersQuery.data}
			categories={categoriesQuery.data}
			onClear={clearFilters}
			onCreate={() => (showCreateDialog = true)}
		/>

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
					onRowClick={(row: Academic) => void goto(resolve(`/academics/${row.id}`))}
				/>
			{/if}
		</main>
	</div>
</div>

<AcademicCreateDialog bind:open={showCreateDialog} onClose={() => (showCreateDialog = false)} />
