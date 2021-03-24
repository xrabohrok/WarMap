<template>
    <div class="toplevel" :class="{leftward: leftward, rightward: rightward}">
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
        <div class="main_deets">
            <img :class="{right: rightward}" src="../../assets/pics/scratch-standin.png"/>
            <div class="detail_row"> <h2> {{this.fighterId}} </h2></div>
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

.deets{
    width: 70%;
}

.main_deets{
    margin-bottom: 1.4em;
    margin-top: 1.2em;
}

h2{
    font-family: 'Saira', sans-serif;
    font-size: 1.7em;
    margin-top: .1em;
    margin-bottom: .1em;
}

img{
    width: 54%;
    height: auto;
    border-color: #9c031f;
    border-radius: .2em;
    border-style: solid;
}

img.right{
    transform: scaleX(-1);
}

.leftward{
    flex-direction: row;
}

.leftward > .deets{
    margin-left: 1.2em;
}

.rightward{
    flex-direction: row-reverse;
}

.rightward > .deets{
    margin-right: 1.2em;
}


@media all and (orientation: portrait) {
    .toplevel{
        height: auto;
    }
}

</style>