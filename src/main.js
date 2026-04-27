import './style.css'
import { Header } from './components/Header.js'
import { Gallery } from './components/Gallery.js'
import { Footer } from './components/Footer.js'

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY

async function fetchPhotos(query = 'nature') {
  if (!ACCESS_KEY || ACCESS_KEY === 'tu_clave_aqui') {
    throw new Error('Añade tu Access Key de Unsplash en el archivo .env (VITE_ACCESS_KEY)')
  }

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&client_id=${ACCESS_KEY}`
  const res = await fetch(url)

  if (res.status === 401) throw new Error('Access Key inválida. Comprueba el valor en .env')
  if (res.status === 403) throw new Error('Límite de peticiones alcanzado. Inténtalo en unos minutos.')
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)

  const data = await res.json()
  return { photos: data.results, total: data.total }
}

const app = document.querySelector('#app')
const gallery = Gallery()
const footer = Footer()

async function search(query) {
  gallery.showLoading()
  try {
    const { photos, total } = await fetchPhotos(query)
    gallery.render(photos, total)
  } catch (err) {
    gallery.showError(err.message)
    console.error(err)
  }
}

const INITIAL_QUERY = 'tattoos'

const header = Header({
  onSearch: search,
  onReset: () => search(INITIAL_QUERY),
})

app.appendChild(header)
app.appendChild(gallery.element)
app.appendChild(footer)

search(INITIAL_QUERY)
