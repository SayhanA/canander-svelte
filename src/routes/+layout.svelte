<script>
	import '../app.css';
	import Toaster from '../components/Toaster.svelte';
	let { children } = $props();
</script>

{@render children()}
<Toaster />