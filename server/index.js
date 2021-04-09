// import {Express, Request, Response} from 'express'
const Express = require('express')

const fsp = require('fs').promises;
const fs = require('fs');

const readAvailableRounds = async function(){
    let roundtype = /.*round\-\d\.json$/
    let files = await fsp.readdir('./src/assets/data/rounds')
    return files.filter(f => roundtype.test(f))
}

module.exports = function (app) {
    app.use(Express.json());
    app.use(Express.text());


    app.get('/server/allFighters', async function(req,res){
        try{
            res.send((fs.readFileSync('./src/assets/data/allfighters.json')).toString());
        }
        catch(err){
            res.status(500).send(err)
        }
    })

    app.get('/server/dataList', async function (req, res) {
        try {
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
            res.send((await fs.readFile(`./src/assets/data/rounds/round-${round}.json`)).toString());
        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    });

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

            var doomed = req.body.doomed
            var target = req.body.target

            // -- delete fighters from rounds and replace with target
            const roundNumTest = /\d/  //there are only 8 rounds, don't need to be ready for double digits
            var roundNums = (await readAvailableRounds()).map(rf => rf.match(roundNumTest)[0])
            //iterate the FILES as that is slightly more efficient
            roundNums.forEach(rn =>{
                var roundfile = fs.readFileSync(`./src/assets/data/rounds/round-${rn}.json`)
                var roundData = JSON.parse(roundfile)
                var tiles = Object.keys(roundData)
                tiles.forEach(t =>{
                    var tile = roundData[t]
                    if((tile.contest || tile.grandbattle)){ 
                        //check for any doomed
                        doomed.forEach(d => {
                            if(tile.fighters.pyre.includes(d)){
                                var index = tile.fighters.pyre.findIndex(pf => pf == d)
                                tile.fighters.pyre[index] = target
                            }

                            if(tile.fighters.bastion.includes(d)){
                                var index = tile.fighters.bastion.findIndex(bf => bf == d)
                                tile.fighters.bastion[index] = target
                            }
                        })
                    }

                })

                fs.writeFileSync(`./src/assets/data/rounds/round-${rn}.json`, JSON.stringify(roundData, null, 2))

            })

            var allFighters = JSON.parse((await fsp.readFile('./src/assets/data/allfighters.json')).toString())
            var targetFighter = allFighters[target]
            //extract details from doomed and transfer to target
            doomed.forEach(d =>{
                let curDoomed = allFighters[d]
                curDoomed.link.forEach(r => targetFighter.link.push(r))
                curDoomed.context.forEach(r => targetFighter.context.push(r))
                curDoomed.faction.forEach(r => targetFighter.faction.push(r))
                curDoomed.rounds.forEach(r => targetFighter.rounds.push(r))
                delete allFighters[d]
            })

            await fs.writeFileSync('./src/assets/data/allfighters.json', JSON.stringify(allFighters, null, 2))
            res.status(200)

        }
        catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    })

    app.post('/server/data', async function (req, res) {
        const name = req.query.name;
        const content = req.body;
        try {
            await fsp.writeFile('./src/data/' + name, content);
            const files = await fsp.readdir('./src/data');
            const names = files.map(
                filename => filename
                    .substr(0, filename.length - '.json'.length)
                    .replace(/-([a-z])/g, match => match[1].toUpperCase())
            );
            const dataTs =
                names.map((name, index) => `import ${name} from './data/${files[index]}'`)
                    .join('\n')
                + '\n\n'
                + 'export default [\n'
                + names.map(name => `    ...${name},`).join('\n')
                + '\n];'
            await fs.writeFile('./src/data.ts', dataTs);
            res.status(200).send('ok');
        } catch (err) {
            res.status(500).send(err);
        }
    });
};
