const axios = require('axios')

var args = process.argv.slice(2)

const filename = args[0]
const survey_data = require(filename)


// console.log(survey_data)
for (const fighter of survey_data) {
    //console.log(fighter)
    if(isNaN(fighter.fighter_id)){
        console.log(`skipped ${fighter.fighter_id} : ${fighter.combatant_name}`)
        continue
    }

    //first, rename fighter
    axios.post(`http://localhost:8080/server/fightername/${fighter.fighter_id}`, {
        name: fighter.combatant_name
    }).catch(err => {
        console.error(`rename failed for ${fighter.fighter_id} : ${fighter.combatant_name} : ${err}`)
    })

    //insert backstory
    axios.post(`http://localhost:8080/server/backstory/${fighter.fighter_id}`, {
        backstory: fighter.background
    }).catch(err => {
        console.error(`background failed for ${fighter.fighter_id} : ${fighter.combatant_name} : ${err}`)
    })

    const regCreator = /^Both/
    var artistRole = fighter.role
    artistRole = regCreator.test(artistRole) ? "Creator" : artistRole

    //insert artist
    await axios.post(`http://localhost:8080/server/artist/${fighter.fighter_id}`, {
        artistname: fighter.artist_name,
        role:artistRole,
        twitter:fighter.artist_twitter,
        instagram:fighter.artist_instagram,
        pw1:fighter.artist_pw1,
        pw2:fighter.artist_pw2,

    }).catch(err => {
        console.error(`primary failed for ${fighter.fighter_id} : ${fighter.combatant_name} : ${err}`)
    })

    const regNocollab = /^I didn't have a collaborator/i

    if(!regNocollab.test(fighter.collab_status))
    {
        //insert artist
        await axios.post(`http://localhost:8080/server/artist/${fighter.fighter_id}`, {
            artistname: fighter.collab_name,
            role:fighter.collab_status,
            twitter:fighter.collab_twitter,
            instagram:fighter.collab_instagram,
            pw1:fighter.collab_pw1,
            pw2:fighter.collab_pw2,

        }).catch(err => {
            console.error(`collab failed for ${fighter.fighter_id} : ${fighter.combatant_name} : ${err}`)
        })
    }

}

