const NS = 'haunted_hunt'

function k(name){
  return `${NS}:${name}`
}

export function save(name, value){
  try{ localStorage.setItem(k(name), JSON.stringify(value)) }catch(e){ /* noop */ }
}

export function load(name, fallback=null){
  try{ const v = localStorage.getItem(k(name)); return v? JSON.parse(v): fallback }catch(e){ return fallback }
}

export function del(name){
  try{ localStorage.removeItem(k(name)) }catch(e){ /* noop */ }
}
