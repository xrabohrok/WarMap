<template>
    <div class="toplevel">
        <div id="main_deets">
            <img src="../../assets/pics/scratch-standin.png"/>
        </div>
        <div class="deets">
            <div class="detail_row"> <h2> {{this.fighterId}} </h2></div>
            <div class="detail_row"> <h4> Faction </h4> </div>
            <div class="detail_row"><b>Artist:</b> Artist Name</div>
            <div class="detail_row"><b>Artist Contact:</b> 
                <div class="sub_row"> <a href="www.twitter.com"> twitter </a></div>
                <div class="sub_row"> <a href="www.discord.com"> discord </a></div>
                <div class="sub_row"> <a href="www.imdb.com"> something else </a></div>
            </div>
            <div class="detail_row"><b>Backstory:</b> Fighter Name</div>
        </div>
    </div>

</template>

<script>
export default {
    props:{
        fighterId:String
    },
    name: "FighterDetails"
}
</script>

<style scoped>
.toplevel{
    font-size: 1.6em;
}

h2{
    font-family: 'Saira', sans-serif;
    font-size: 3em;
    margin-top: .2em;
    margin-bottom: .2em;
}

</style>