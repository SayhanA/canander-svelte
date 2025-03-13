<script>
	// @ts-nocheck
	import { toasts } from '../stores/toastStore.js';
	import { fly, fade } from 'svelte/transition';
</script>

<div class="toast-container">
	{#each $toasts as {  type, message, id }}
		<div class="toast {type}" in:fly={{ y: -50, duration: 300 }} out:fade={{ duration: 500 }}>
			<span>{message}</span>
			<button on:click={() => toasts.update((t) => t.filter((toast) => toast.id !== id))}>✖</button
			>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		top: 20px;
		right: 20px;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.toast {
		padding: 12px 16px;
		border-radius: 8px;
		color: white;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: 250px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease-in-out;
		transform: translateY(-50px);
		opacity: 0;
		animation: fadeIn 0.5s forwards;
	}

	@keyframes fadeIn {
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.toast.success {
		background: #4caf50;
	}

	.toast.error {
		background: #f44336;
	}

	.toast.warning {
		background: #ff9800;
	}

	.toast.info {
		background: #2196f3;
	}

	.toast button {
		background: transparent;
		border: none;
		color: white;
		font-size: 16px;
		cursor: pointer;
	}
</style>
