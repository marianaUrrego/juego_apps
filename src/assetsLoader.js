const forestChars = import.meta.glob('./assets/backgrounds/forest/characters/**/*.{png,jpg,jpeg,gif,webp,svg}', { eager: true })
const cementeryChars = import.meta.glob('./assets/backgrounds/cementery/characters/**/*.{png,jpg,jpeg,gif,webp,svg}', { eager: true })
const libraryChars = import.meta.glob('./assets/backgrounds/library/characters/**/*.{png,jpg,jpeg,gif,webp,svg}', { eager: true })

const objects = import.meta.glob('./assets/objetos/*.{png,jpg,jpeg,gif,webp,svg}', { eager: true })

const guiImages = import.meta.glob('./assets/gui/*.{png,jpg,jpeg,webp,svg}', { eager: true })

function mapToUrls(record) {
  return Object.values(record).map(m => m.default || m)
}

export function getLevelSprites(level) {
  switch(level){
    case 'forest': return mapToUrls(forestChars)
    case 'cementery': return mapToUrls(cementeryChars)
    case 'library': return mapToUrls(libraryChars)
    default: return []
  }
}

export function getObjects(limit) {
  const list = mapToUrls(objects)
  return typeof limit === 'number' ? list.slice(0, limit) : list
}

export function getGuiImages() {
  return mapToUrls(guiImages)
}
