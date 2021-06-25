// import {Express, Request, Response} from 'express'
const Express = require('express')

const fsp = require('fs').promises;
const fs = require('fs');

const readAvailableRounds = async function(){
    let roundtype = /^round\-\d\.json$/
    let files = await fsp.readdir('./src/assets/data/rounds')
    return files.filter(f => roundtype.test(f))
}

const syncFileLoc = async function(){
    if(!fs.existsSync('./changes')){
        fs.mkdirSync('./changes')
        await fsp.copyFile('./src/assets/data/allfighters.json', './changes/allfighters.json')
        await fsp.copyFile('./src/assets/data/backstories.json', './changes/backstories.json')

        const roundNumTest = /\d/  //there are only 8 rounds, don't need to be ready for double digits
        var roundNums = (await readAvailableRounds()).map(rf => rf.match(roundNumTest)[0])
        // console.log(roundNums)
        for (const r of roundNums) {
            await fsp.copyFile(`./src/assets/data/rounds/round-${r}.json`, `./changes/round-${r}.json`)     
        };
    }
}

var allstories = {}
var allfighters = {}


syncFileLoc().then(()=>{
    allfighters = JSON.parse((fs.readFileSync('./changes/allfighters.json')))
    allstories = JSON.parse(fs.readFileSync('./changes/backstories.json'))
})

module.exports = function (app) {
    app.use(Express.json());
    app.use(Express.text());


    app.get('/server/allfighters', async function(req,res){
        try{
            await syncFileLoc()

            res.json(allfighters)
        }
        catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    })

    app.get('/server/dataList', async function (req, res) {
        try {
            await syncFileLoc()

            let finalFiles = readAvailableRounds()
            res.json(finalFiles);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/server/data', async function (req, res) {
        try {
            if(!('round' in req.query)){
                res.status(400).send("the round query is required for this request")
                return
            }
            const round = req.query.round;
            res.send((await fs.readFile(`./changes/round-${round}.json`)).toString());
        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    });

    app.get('/server/backstory/:fighterId', async function(req,res){
        try{
            if(isNaN(req.params.fighterId)){
                res.status(400).send("The fighter Id is a number")
                return
            }

            if(!(`${req.params.fighterId}` in allstories)){
                res.status(404).send("The fighter Id is not in the set")
                return
            }

            res.send(allstories[req.params.fighterId].toString());
        }
        catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    })


    app.post('/server/backstory/:fighterId', async function(req,res){
        try{
            if(isNaN(req.params.fighterId)){
                res.status(400).send("The fighter Id is a number")
                return
            }

            allstories[req.params.fighterId] = req.body.backstory

            await fs.writeFileSync('./changes/backstories.json', JSON.stringify(allstories, null, 2))
            res.status(200).send()
        }
        catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    })

    app.post('/server/picture/:fighterId', async function(req,res){
        try{
            if(isNaN(req.params.fighterId)){
                res.status(400).send("The fighter Id is a number")
                return
            }

            allfighters[req.params.fighterId]['profilePic'] = req.body

            await fs.writeFileSync('./changes/allfighters.json', JSON.stringify(allfighters, null, 2))
            res.status(200).send()
        }
        catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    })

    app.post('/server/artist/:fighterId', async function(req, res){
        try{
            if(isNaN(req.params.fighterId)){
                res.status(400).send("The fighter Id is a number")
                return
            }

            var fighterId = req.params.fighterId
            var body = req.body

            allfighters[fighterId].artists[body.artistname] ={
                name:body.artistname,
                role:body.role,
                contacts: {}
            }

            if(body.twitter && !(body.twitter === "")){
                allfighters[fighterId].artists[body.artistname].contacts["twitter"] = body.twitter
            }

            if(body.instagram && !(body.instagram === "")){
                allfighters[fighterId].artists[body.artistname].contacts["instagram"] = body.instagram
            }

            if(body.pw1 && !(body.pw1 === "")){
                allfighters[fighterId].artists[body.artistname].contacts["pw1"] = body.pw1
            }

            if(body.pw2 && !(body.pw2 === "")){
                allfighters[fighterId].artists[body.artistname].contacts["pw2"] = body.pw2
            }

            await fs.writeFileSync('./changes/allfighters.json', JSON.stringify(allfighters, null, 2))
            res.status(200).send()

        }
        catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    })

    app.post('/server/fightername/:fighterId', async function(req, res){
        try{
            if(isNaN(req.params.fighterId)){
                res.status(400).send("The fighter Id is a number")
                return
            }

            if(!('name' in req.body)){
                res.status(400).send("Need to specify a name!")
                return
            }

            var fighterId = req.params.fighterId

            allfighters[fighterId].name = req.body.name

            await fs.writeFileSync('./changes/allfighters.json', JSON.stringify(allfighters, null, 2))
            res.status(200).send()

        }
        catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    })


    app.post('/server/mergeFighters', async function(req, res){
        try{
            //two things need to happen if a fighter is deleted:
            //- delete the fighter entry (duh)
            //- (more difficult) remove any listing of that fighter on a tile
            //- merge the fighters inline details to the actual fighter
            if(!('target' in req.body)){
                console.log('missing target')
                res.status(400).send("the request must mention the target id (the fighter to survive the merge)")
                return
            }
            if(!('doomed' in req.body)){
                console.log('missing doomed')
                res.status(400).send("the request must include a field with the array (of id's) of fighters to remove")
                return
            }

            // var doomed = req.body.doomed.split(',')
            var doomed = req.body.doomed
            var target = req.body.target

            // -- delete fighters from rounds and replace with target
            const roundNumTest = /\d/  //there are only 8 rounds, don't need to be ready for double digits
            var roundNums = (await readAvailableRounds()).map(rf => rf.match(roundNumTest)[0])
            //iterate the FILES as that is slightly more efficient
            roundNums.forEach(rn =>{
                var roundfile = fs.readFileSync(`./changes/round-${rn}.json`)
                var roundData = JSON.parse(roundfile)
                var tiles = Object.keys(roundData)
                tiles.forEach(t =>{
                    var tile = roundData[t]
                    if((tile.contest || tile.grandBattle)){ 
                        //check for any doomed
                        doomed.forEach(d => {
                            if(tile.fighters.pyre.includes(d)){
                                var index = tile.fighters.pyre.findIndex(pf => pf === d)
                                tile.fighters.pyre[index] = target
                            }

                            if(tile.fighters.bastion.includes(d)){
                                var index = tile.fighters.bastion.findIndex(bf => bf === d)
                                tile.fighters.bastion[index] = target
                            }
                        })
                    }

                })

                fs.writeFileSync(`./changes/round-${rn}.json`, JSON.stringify(roundData, null, 2))

            })

            var targetFighter = allfighters[target]
            //extract details from doomed and transfer to target
            doomed.forEach(d =>{
                let curDoomed = allfighters[d]
                curDoomed.link.forEach(r => targetFighter.link.push(r))
                curDoomed.context.forEach(r => targetFighter.context.push(r))
                curDoomed.faction.forEach(r => targetFighter.faction.push(r))
                curDoomed.rounds.forEach(r => targetFighter.rounds.push(r))
                delete allfighters[d]
            })

            targetFighter.verified = true

            await fs.writeFileSync('./changes/allfighters.json', JSON.stringify(allfighters, null, 2))
            res.status(200).send()

        }
        catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    })

};
