const forestChars = import.meta.glob('./assets/backgrounds/forest/characters/**/*.{png,jpg,jpeg,gif,webp,svg}', { eager: true, import: 'default' })
const cementeryChars = import.meta.glob('./assets/backgrounds/cementery/characters/**/*.{png,jpg,jpeg,gif,webp,svg}', { eager: true, import: 'default' })
const libraryChars = import.meta.glob('./assets/backgrounds/library/characters/**/*.{png,jpg,jpeg,gif,webp,svg}', { eager: true, import: 'default' })

const objects = import.meta.glob('./assets/objetos/*.{png,jpg,jpeg,gif,webp,svg}', { eager: true, import: 'default' })

const guiImages = import.meta.glob('./assets/gui/*.{png,jpg,jpeg,webp,svg}', { eager: true, import: 'default' })

import cementeryBg from './assets/backgrounds/cementery/Background 300x128.png'

function mapToUrls(record) {
  return Object.values(record)
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
  // Excluir cualquier archivo que parezca ser un spritesheet de Boss
  const filtered = list.filter(u => !/boss\s?\d*\./i.test(u))
  return typeof limit === 'number' ? filtered.slice(0, limit) : filtered
}

export function getGuiImages() {
  return mapToUrls(guiImages)
}

export function getLevelBackground(level) {
  switch(level){
    case 'cementery': return cementeryBg
    default: return null
  }
}
