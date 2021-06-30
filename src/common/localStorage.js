//from MDN guide: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
//takes localStorage or sessionStorage as parameters
//tries to touch storage and notes the result, returns truthy if able, falsy error if not
function storageAvailable(type) {
  var storage
  try {
    storage = window[type]
    var x = "__storage_test__"
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    )
  }
}

function getKey(key) {
  const temp = localStorage.getItem(key)
  if (temp == null) return null
  return JSON.parse(temp)
}

//value can only be an object or array
async function setKey(key, value) {
  const stringed = JSON.stringify(value)
  // const stringed = JSON.stringify(value, null, 2)
  localStorage.setItem(key, stringed)
}

async function initializeKey(key) {
  localStorage.setItem(key, "{}")
}

export { storageAvailable, getKey, setKey, initializeKey }
