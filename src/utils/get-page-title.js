const title = process.env.VUE_APP_BASE_TITLE || 'Vue.js Boilerplate'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
