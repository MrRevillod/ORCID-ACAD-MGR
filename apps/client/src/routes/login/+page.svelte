<script lang="ts">
	import { goto } from "$app/navigation"
	import { resolve } from "$app/paths"
	import LoginForm from "$lib/auth/components/login-form.svelte"

	async function handleSuccess() {
		await goto(resolve("/"))
	}
</script>

<div class="flex h-full items-center justify-center px-4 py-8">
	<LoginForm onSuccess={handleSuccess} />
</div>
