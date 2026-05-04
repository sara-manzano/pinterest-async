const FOOTER_LINKS = [
  { label: 'Acerca de', href: 'https://about.pinterest.com' },
  { label: 'Blog', href: 'https://blog.pinterest.com' },
  { label: 'Empleo', href: 'https://www.pinterestcareers.com' },
  { label: 'Privacidad', href: 'https://policy.pinterest.com/es/privacy-policy' },
  { label: 'Términos', href: 'https://policy.pinterest.com/es/terms-of-service' },
  { label: 'Ayuda', href: 'https://help.pinterest.com' },
]

export function Footer() {
  const footer = document.createElement('footer')
  footer.className = 'footer'

  const year = new Date().getFullYear()

  const links = FOOTER_LINKS
    .map(({ label, href }) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`)
    .join('')

  footer.innerHTML = `
    <div class="footer__row">
      <button class="footer__lang" aria-label="Idioma">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        Español (ES)
      </button>

      <nav class="footer__links" aria-label="Pie de página">
        ${links}
      </nav>

      <span class="footer__copy">© ${year} pinterest-async
      </span>
    </div>
  `

  return footer
}
