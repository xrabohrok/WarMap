var comicCount = function(fighters, round){
	var BastionSet = Object.values(fighters).filter(f =>{
		var index = f.rounds.findIndex(r => r == round)
		if (index == -1) return false
		return f.faction[index] === "bastion" 
	})
	var PyreSet = Object.values(fighters).filter(f =>{
		var index = f.rounds.findIndex(r => r == round)
		if (index == -1) return false
		return f.faction[index] === "pyre" 
	})
	console.log(`${round} \t : Bastion ${BastionSet.length} :\t Pyre ${PyreSet.length}`) 
}
	
	
	