/** Create ripple effect on button click */
export function createRipple(e: MouseEvent): void {
  const btn = e.currentTarget as HTMLElement;
  if (!btn) return;

  const ripple = document.createElement('span');
  ripple.classList.add('btn-ripple');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}
