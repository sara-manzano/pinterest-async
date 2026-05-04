import { Card } from './Card.js'

const SKELETON_HEIGHTS = [180, 240, 160, 280, 200, 220, 170, 260, 190, 210,
                          250, 180, 230, 170, 290, 200, 160, 240, 210, 180]

function createSkeleton(height) {
  const el = document.createElement('div')
  el.className = 'skeleton'
  el.innerHTML = `
    <div class="skeleton__image" style="height:${height}px"></div>
    <div class="skeleton__author">
      <div class="skeleton__avatar"></div>
      <div class="skeleton__name"></div>
    </div>
  `
  return el
}

function buildCardFromPhoto(photo) {
  return Card({
    imageUrl: photo.urls.small,
    altDescription: photo.alt_description,
    authorName: photo.user.name,
    authorAvatar: photo.user.profile_image?.small ?? '',
    authorLink: photo.user.links?.html ?? '',
    detailLink: photo.links.html,
    likes: photo.likes,
    bgColor: photo.color,
    createdAt: photo.created_at,
    totalPhotos: photo.user.total_photos,
  })
}

export function Gallery({ onLoadMore } = {}) {
  const wrapper = document.createElement('div')
  wrapper.className = 'gallery-wrapper'

  const info = document.createElement('p')
  info.className = 'gallery__info'
  info.hidden = true

  const section = document.createElement('section')
  section.className = 'gallery'
  section.setAttribute('aria-label', 'Galería de fotos')

  const loadMoreBtn = document.createElement('button')
  loadMoreBtn.className = 'gallery__load-more'
  loadMoreBtn.textContent = 'Cargar más'
  loadMoreBtn.hidden = true
  loadMoreBtn.addEventListener('click', () => onLoadMore?.())

  wrapper.appendChild(info)
  wrapper.appendChild(section)
  wrapper.appendChild(loadMoreBtn)

  function render(photos, total, hasMore = false) {
    section.innerHTML = ''
    loadMoreBtn.hidden = true
    loadMoreBtn.textContent = 'Cargar más'

    if (!photos || photos.length === 0) {
      info.hidden = true
      section.innerHTML = '<p class="gallery__empty">No se encontraron fotos para esta búsqueda.</p>'
      return
    }

    info.textContent = `${new Intl.NumberFormat('es-ES').format(total)} resultados`
    info.hidden = false

    photos.forEach(photo => section.appendChild(buildCardFromPhoto(photo)))
    loadMoreBtn.hidden = !hasMore
  }

  function append(photos, hasMore = false) {
    photos.forEach(photo => section.appendChild(buildCardFromPhoto(photo)))
    loadMoreBtn.hidden = !hasMore
    loadMoreBtn.textContent = 'Cargar más'
    loadMoreBtn.disabled = false
  }

  function setLoadingMore(loading) {
    loadMoreBtn.disabled = loading
    loadMoreBtn.textContent = loading ? 'Cargando…' : 'Cargar más'
  }

  function showLoading() {
    info.hidden = true
    loadMoreBtn.hidden = true
    section.innerHTML = ''
    SKELETON_HEIGHTS.forEach(h => section.appendChild(createSkeleton(h)))
  }

  function showError(message) {
    info.hidden = true
    loadMoreBtn.hidden = true
    section.innerHTML = `
      <div class="gallery__error">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p>${message}</p>
      </div>
    `
  }

  return { element: wrapper, render, append, setLoadingMore, showLoading, showError }
}

