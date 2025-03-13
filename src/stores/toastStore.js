// @ts-nocheck
import { writable } from 'svelte/store';

export const toasts = writable([]);

export function addToast(type = 'success', message, duration = 3000) {
	const id = Date.now();
	toasts.update(t => [...t, { type, message, id  }])

	setTimeout(() => {
		toasts.update(t => t.filter(toast => toast.id !== id));
	}, duration);
}
