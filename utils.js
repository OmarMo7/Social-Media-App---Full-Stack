
export const fixTags = (tags) => {
  // "Bring , f  ,ff ,   , , " are all equal to "Bring,f,ff"
  let newTags = ''
  newTags = tags.map((tag) => {
    if (!tag.replace(/\s/g, '').length) return
    else return tag.trim()
  }).filter((tag) => tag !== undefined)
  return newTags
}