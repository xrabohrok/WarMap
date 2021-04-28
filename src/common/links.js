const imgrTest = /^(https:\/\/)?imgur\.com\/.*\/.......$/mi
const twitterTest = /^(https:\/\/)twitter\.com/mi
const tumblrTest = /^(https:\/\/).*mrlemur\.tumblr\.com\/post\//mi

const linkLabel = function(link){

    if (imgrTest.test(link)) return "Imgur"
    if (twitterTest.test(link)) return "Twitter"
    if (tumblrTest.test(link)) return "Tumblr"
    return "Link"
}

const cubariLink = function(link){

    const imgurIDPart = /\/(a|gallery)\/.......$/i
    var parts = link.match(imgurIDPart)
    
    if(parts === null) return ""
    var id = parts[0].split('/')[2]
    return `https://cubari.moe/read/imgur/${id}/`
}

const showCubari = function(link){
    return imgrTest.test(link)
}

export {showCubari, cubariLink, linkLabel}