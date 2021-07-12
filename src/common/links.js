const imgrTest = /^(https?:\/\/)?imgur\.com\/.*\/.......$/im
const directCubariTest = /^(https:\/\/)?cubari\.moe\/.*/im
const twitterTest = /^(https:\/\/)twitter\.com/im
const tumblrTest = /^(https:\/\/).*\.tumblr\.com\/post\//im

const linkLabel = function(link) {
  if (imgrTest.test(link)) return "Imgur"
  if (twitterTest.test(link)) return "Twitter"
  if (tumblrTest.test(link)) return "Tumblr"
  if (directCubariTest.test(link)) return "Cubari"
  return "Link"
}

const cubariLink = function(link) {
  const imgurIDPart = /\/(a|gallery)\/.......$/i
  var parts = link.match(imgurIDPart)

  if (parts === null) {
    //could be a cubari agragation link, weirder but possible
    var sparts = link.match(directCubariTest)
    if (sparts === null) return ""
    return link
  }

  var id = parts[0].split("/")[2]
  return `https://cubari.moe/read/imgur/${id}/`
}

const isNotALink = function(link) {
  return link.toLowerCase().includes("[no submission]") || link.trim() === "na"
}

const showCubari = function(link) {
  return imgrTest.test(link)
}

const buildTwitterLink = function(userHandle) {
  const cleanHandle = userHandle.replace("@", "")
  return `https://www.twitter.com/${cleanHandle}`
}

const buildInstagramLink = function(userHandle) {
  const cleanHandle = userHandle.replace("@", "")
  return `https://www.instagram.com/${cleanHandle}`
}

export {
  showCubari,
  cubariLink,
  linkLabel,
  buildTwitterLink,
  buildInstagramLink,
  isNotALink
}
