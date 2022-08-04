export function handleFocusLeave(node: HTMLElement, cb: () => void) {
	function handleFocusIn() {
		if (!node.contains(document.activeElement)) {
			cb();
		}
	}
	document.addEventListener('focusin', handleFocusIn);

	return {
		destroy: () => {
			document.removeEventListener('focusin', handleFocusIn);
		}
	};
}
