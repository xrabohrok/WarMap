var count = 0
airtable.forEach(a => {
  var result = fighters.find(
    f =>
      a["Character Name"].toLowerCase().trim() === f.name.toLowerCase().trim()
  )
  if (result != undefined) {
    a.W_ID = result.id
    count += 1
  }
})

function tsvify(anarray, filename, use_headers = true) {
  var keys = Object.keys(anarray[0])
  var dest_string = []

  //headers
  if (use_headers) {
    var line = []
    keys.forEach(k => {
      line.push(`${k}`)
    })
    dest_string.push(line.join("\t"))
  }

  anarray.forEach(a => {
    var line = []
    keys.forEach(k => {
      line.push(a[`${k}`])
    })
    dest_string.push(line.join("\t"))
  })

  var raw_file = dest_string.join("\r\n")
  fs.writeFileSync(`./${filename}.tsv`, raw_file)
}

var fs = require("fs")
var path = require("path")
var axios = require("axios")
async function downFile(fileUrl, downloadFolder, id) {
  // Get the file name
  const fileName = path.basename(fileUrl)

  //need that extension
  var extension = fileName.split(".")[1]

  // The path of the downloaded file on our machine
  const localFilePath = path.resolve(
    path.resolve(),
    downloadFolder,
    `${id}.${extension}`
  )
  try {
    const response = await axios({
      method: "GET",
      url: fileUrl,
      responseType: "stream"
    })

    const w = response.data.pipe(fs.createWriteStream(localFilePath))
    w.on("finish", () => {
      console.log("Successfully downloaded file!")
    })
  } catch (err) {
    throw new Error(err)
  }
}

var picurl = /\(http.*\)$/gi
airtable.forEach(a => {
  if (a["Character Sheet"] && a["Character Sheet"].length > 0 && a.W_ID) {
    var url = a["Character Sheet"].match(picurl)[0].replace(/\(|\)/g, "")
    downFile(url, "pics", a.W_ID)
  }
})

var airtable = require("./airtable.json")
var allfighters = require("../allfighters.json")

var roundConversion = {
  "1": "Round 1 link",
  "2": "Round 2 Link",
  "3": "Round 3 Link",
  "4": "Round 4 Link",
  "5": "Round 5 Link",
  "6": "Round 6 Link",
  "7": "Round 7 Link",
  "8": "Round 8 Link"
}

airtable.forEach(a => {
  if (a.W_ID && Object.keys(allfighters).includes(a.W_ID)) {
    //transplant comics
    var myentry = allfighters[a.W_ID]
    myentry.rounds.forEach((r, i) => {
      var roundfield = `${roundConversion[r]}`
      if (!(roundfield in a) || a[roundfield] == "") {
        a[roundfield] = myentry.link[i]
      }
    })
  }
})

var keys = Object.keys(allfighters)
var airtable_keys = airtable.map(a => a.W_ID)
var missing_keys = keys.filter(k => !airtable_keys.includes(k))
missing_keys.sort((a, b) => parseInt(a) - parseInt(b))

var new_airtable = missing_keys.map(mk => {
  var fighter_entry = allfighters[mk]
  var retval = {
    W_ID: `${fighter_entry.id}`,
    "Character Name": fighter_entry.name,
    "Sub. No.": "",
    "Character Sheet": "",
    Token: "",
    Faction: fighter_entry.faction[0],
    Artist: "",
    Writer: "",
    Species: "",
    Class: "",
    "Lore / More Info": "",
    Size: "",
    "Social Media": "",
    "Intro Comic": "",
    "Submission post": "",
    "Round 1 link": "",
    "Round 2 Link": "",
    "Round 3 Link": "",
    "Round 4 Link": "",
    "Round 5 Link": "",
    "Round 6 Link": "",
    "Round 7 Link": "",
    Alive: ""
  }
  var myentry = fighter_entry
  myentry.rounds.forEach((r, i) => {
    var roundfield = `${roundConversion[r]}`
    retval[roundfield] = myentry.link[i]
  })

  Object.keys(myentry.artists).forEach(a => {
    if (
      myentry.artists[a].role === "Artist" ||
      myentry.artists[a].role === "Creator"
    ) {
      retval.Artist = myentry.artists[a].name
    } else if (myentry.artists[a].role === "Writer") {
      retval.Writer = myentry.artists[a].name
    }
  })
  return retval
})

airtable
  .filter(a => a.W_ID)
  .forEach(a => {
    var curfighter = fighters[a.W_ID]
    console.log(
      `${a.W_ID} - ${a["Character Name"]} - ${
        Object.keys(curfighter.artists).length
      }`
    )
    if (Object.keys(curfighter.artists).length === 0) {
      console.log("...empty artist, filling...")
      if (a.Artist !== "" && a.Writer === "") {
        curfighter.artists[a.Artist] = {
          role: "Creator",
          name: a.Artist,
          contacts: {}
        }
        console.log(`Added ${a.Artist} as Creator for ${a["Character Name"]}`)
      } else if (a.Artist !== "") {
        curfighter.artists[a.Artist] = {
          role: "Artist",
          name: a.Artist,
          contacts: {}
        }
        console.log(`Added ${a.Artist} as Artist for ${a["Character Name"]}`)
      }
      if (a.Writer !== "") {
        curfighter.artists[a.Writer] = {
          role: "Writer",
          name: a.Writer,
          contacts: {}
        }
        console.log(`Added ${a.Writer} as Writer for ${a["Character Name"]}`)
      }
    }
  })
