export function Header({ onSearch, onReset }) {
  const header = document.createElement('header')
  header.className = 'header'

  header.innerHTML = `
    <div class="header__logo">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" aria-label="Pinterest logo">
        <circle cx="20" cy="20" r="20" fill="#e60023"/>
        <path fill="#fff" d="M20 6C12.27 6 6 12.27 6 20c0 5.63 3.28 10.5 8.05 12.87-.11-1.01-.21-2.56.04-3.66.23-1 1.49-6.33 1.49-6.33s-.38-.76-.38-1.89c0-1.77 1.03-3.09 2.3-3.09 1.08 0 1.61.81 1.61 1.79 0 1.09-.69 2.72-1.05 4.23-.3 1.26.63 2.3 1.88 2.3 2.26 0 4-2.38 4-5.82 0-3.04-2.19-5.17-5.31-5.17-3.62 0-5.74 2.71-5.74 5.52 0 1.09.42 2.26.95 2.9a.38.38 0 0 1 .09.36l-.35 1.44c-.06.23-.18.28-.43.17-1.59-.74-2.58-3.06-2.58-4.93 0-4.01 2.91-7.69 8.4-7.69 4.41 0 7.84 3.14 7.84 7.34 0 4.38-2.76 7.9-6.6 7.9-1.29 0-2.5-.67-2.91-1.46l-.79 3.02c-.29 1.1-1.06 2.49-1.58 3.33A14 14 0 0 0 20 34c7.73 0 14-6.27 14-14S27.73 6 20 6z"/>
      </svg>
    </div>

    <nav class="header__nav" aria-label="Navegación principal">
      <button class="header__nav-btn header__nav-btn--active">Inicio</button>
      <button class="header__nav-btn">Explorar</button>
      <button class="header__nav-btn">Crear</button>
    </nav>

    <div class="header__search">
      <svg class="header__search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        type="text"
        class="header__input"
        placeholder="Buscar"
        aria-label="Buscar fotos"
      />
      <button class="header__search-btn" aria-label="Buscar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>
    </div>

    <div class="header__actions">
      <button class="header__icon-btn" aria-label="Notificaciones">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </button>
      <button class="header__icon-btn" aria-label="Mensajes">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/>
          <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/>
        </svg>
      </button>
      <button class="header__icon-btn header__icon-btn--avatar" aria-label="Perfil">
        S
      </button>
    </div>
  `

  const input = header.querySelector('.header__input')
  const logo = header.querySelector('.header__logo')
  const searchBtn = header.querySelector('.header__search-btn')

  function triggerSearch() {
    const query = input.value.trim()
    if (query) {
      onSearch(query)
      input.value = ''
    }
  }

  const searchWrapper = header.querySelector('.header__search')
  searchWrapper.addEventListener('click', () => input.focus())
  input.addEventListener('keydown', e => e.key === 'Enter' && triggerSearch())
  searchBtn.addEventListener('click', e => { e.stopPropagation(); triggerSearch() })

  logo.style.cursor = 'pointer'
  logo.addEventListener('click', () => {
    input.value = ''
    if (onReset) onReset()
  })

  return header
}

