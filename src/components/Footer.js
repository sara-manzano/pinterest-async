export function Footer() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const year = new Date().getFullYear();

  footer.innerHTML = `
    <p class="footer__credits">
      Fotos por <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
      &mdash; Inspirado en <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
    </p>
    <p class="footer__copy">&copy; ${year} pinterest-async. Hecho con Vite + JS Vanilla.</p>
  `;

  return footer;
}
