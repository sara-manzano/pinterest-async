import './style.css'
import { Header } from './components/Header.js'
import { Gallery } from './components/Gallery.js'
import { Footer } from './components/Footer.js'

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY
const INITIAL_QUERY = 'tattoos'
const PER_PAGE = 20

async function fetchPhotos(query, page = 1) {
  if (!ACCESS_KEY || ACCESS_KEY === 'tu_clave_aqui') {
    throw new Error('Añade tu Access Key de Unsplash en el archivo .env (VITE_ACCESS_KEY)')
  }

  const url = new URL('https://api.unsplash.com/search/photos')
  url.searchParams.set('query', query)
  url.searchParams.set('per_page', String(PER_PAGE))
  url.searchParams.set('page', String(page))
  url.searchParams.set('client_id', ACCESS_KEY)

  const res = await fetch(url)

  if (res.status === 401) throw new Error('Access Key inválida. Comprueba el valor en .env')
  if (res.status === 403) throw new Error('Límite de peticiones alcanzado. Inténtalo en unos minutos.')
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

  const data = await res.json()
  const totalPages = Math.ceil(data.total / PER_PAGE)
  return { photos: data.results, total: data.total, hasMore: page < totalPages }
}

const app = document.querySelector('#app')

let currentQuery = INITIAL_QUERY
let currentPage = 1

async function loadMore() {
  currentPage += 1
  gallery.setLoadingMore(true)
  try {
    const { photos, hasMore } = await fetchPhotos(currentQuery, currentPage)
    gallery.append(photos, hasMore)
  } catch (err) {
    gallery.setLoadingMore(false)
    console.error(err)
  }
}

const gallery = Gallery({ onLoadMore: loadMore })
const footer = Footer()

async function search(query) {
  currentQuery = query
  currentPage = 1
  gallery.showLoading()
  try {
    const { photos, total, hasMore } = await fetchPhotos(query, 1)
    gallery.render(photos, total, hasMore)
  } catch (err) {
    gallery.showError(err.message)
    console.error(err)
  }
}

const header = Header({
  onSearch: search,
  onReset: () => search(INITIAL_QUERY),
})

app.appendChild(header)
app.appendChild(gallery.element)
app.appendChild(footer)

search(INITIAL_QUERY)
