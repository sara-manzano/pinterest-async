function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function safeUrl(url) {
  return url && /^https?:\/\//.test(url) ? url : '#'
}

function formatLikes(likes) {
  if (likes >= 1000) return `${(likes / 1000).toFixed(1)}k`
  return String(likes ?? 0)
}

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const AVATAR_COLORS = ['#b5e550', '#4a90d9', '#9b59b6', '#f39c12', '#e74c3c', '#1abc9c', '#e91e8c', '#3498db']
function avatarColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export function Card({ imageUrl, altDescription, authorName, authorAvatar, authorLink, detailLink, likes, bgColor, createdAt, totalPhotos }) {
  const likesText = formatLikes(likes)
  const altText = altDescription || `Foto de ${authorName}`
  const dateText = formatDate(createdAt)
  const photosText = totalPhotos ? `+${totalPhotos}` : ''
  const borderColor = avatarColor(authorName || '')

  const article = document.createElement('article')
  article.className = 'card'

  article.innerHTML = `
    <div class="card__media">
      <a class="card__image-link" href="${safeUrl(detailLink)}" target="_blank" rel="noopener noreferrer">
        <img
          class="card__image"
          src="${safeUrl(imageUrl)}"
          alt="${escapeHtml(altText)}"
          loading="lazy"
          style="background-color:${escapeHtml(bgColor ?? '#ebebeb')}"
        />
        <div class="card__overlay">
          ${photosText ? `
          <div class="card__badge card__badge--photos" aria-label="${escapeHtml(photosText)} fotos">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            <span>${escapeHtml(photosText)}</span>
          </div>` : ''}
          <div class="card__badge card__badge--likes" aria-label="${escapeHtml(likesText)} me gusta">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>${escapeHtml(likesText)}</span>
          </div>
          <span class="card__visit-btn">Visitar</span>
        </div>
      </a>
      <a class="card__avatar-wrap" href="${safeUrl(authorLink)}" target="_blank" rel="noopener noreferrer" aria-label="Perfil de ${escapeHtml(authorName)}" style="border-color:${borderColor}">
        <img class="card__avatar" src="${safeUrl(authorAvatar)}" alt="" loading="lazy" />
      </a>
    </div>
    <div class="card__info">
      <a class="card__author-name" href="${safeUrl(authorLink)}" target="_blank" rel="noopener noreferrer">
        ${escapeHtml(authorName)}
      </a>
      ${dateText ? `
      <div class="card__meta">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <polyline points="16 6 12 2 8 6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
        <span>${escapeHtml(dateText)}</span>
      </div>` : ''}
    </div>
  `

  return article
}


