import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

interface ToastConfig {
	title: string;
	description?: string;
	type?: 'error' | 'info' | 'success' | 'warning';
	style?: 'filled' | 'outline';
	duration?: number | undefined;
	onClick?: () => void;
	onRemove?: () => void;
}

interface ToastReturn extends ToastConfig {
	id: string;
	addedTime: Date;
	remove: () => void;
	update: (value: ToastConfig) => void;
}

const toastsStoreGen = () => {
	const { subscribe, update } = writable<ToastReturn[]>([]);

	const removeById = (id: string) => {
		update((current) => current.filter((item) => item.id !== id));
	};

	const updateById = (id: string, newValue: ToastConfig) => {
		update((current) =>
			current.map((item) => {
				if (item.id === id) {
					return { ...item, ...newValue };
				}
				return item;
			})
		);
	};

	const addToast = ({
		duration = 2000,
		style = 'filled',
		type = 'warning',
		...config
	}: ToastConfig) => {
		const id = uuidv4();
		const addedToast: ToastReturn = {
			...config,
			duration,
			style,
			type,
			id,
			addedTime: new Date(),
			remove: () => removeById(id),
			update: (value) => updateById(id, value)
		};

		if (addedToast.duration) {
			setTimeout(() => {
				addedToast.remove();
				if (typeof addedToast.onRemove === 'function') addedToast.onRemove();
			}, addedToast.duration);
		}

		update((current) => [...current, addedToast]);
	};

	return {
		subscribe,
		addToast,
		removeById,
		updateById
	};
};

const toastsStore = toastsStoreGen();

export default toastsStore;
