<template>
    <div class="toplevel" :class="{left: leftward, right: rightward}">
        <div id="main_deets">
            <img src="../../assets/pics/scratch-standin.png"/>
            <div class="detail_row"> <h2> {{this.fighterId}} </h2></div>
        </div>
        <div class="deets">
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
        fighterId:String,
        isLeft:Boolean,
        isRight:Boolean
    },
    computed:{
        leftward: function(){
            return this.isLeft
        },
        rightward: function(){
            return this.isRight
        }
    },
    name: "FighterDetails"
}
</script>

<style scoped>
.toplevel{
    display: flex;
    flex-direction: column;
    font-size: 1.2em;
    height: 22vh;
}

h2{
    font-family: 'Saira', sans-serif;
    font-size: 1.7em;
    margin-top: .1em;
    margin-bottom: .1em;
}

img{
    top:auto;
    bottom: auto;
    width: auto;
    height: 60%;
}

.left{
    flex-direction: row;
}

.right{
    flex-direction: row-reverse;
}


@media all and (orientation: portrait) {
    .toplevel{
        height: auto;
    }
}

</style>