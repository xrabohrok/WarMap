<template>
    <div class="mapTile" :style="tileWidth">
        <img src="../assets/mapTiles/map-tile.png">
        <div class="label">
            {{title}}
        </div>
    </div>
</template>

<script>

export default {
    name: 'MapTile',
    computed:{
        tileWidth: function(){
            return{
                "width": `${(100/14)}%`
            }
        }

    },
    props: {
        title: String
    }
}

</script>

<style scoped>

.mapTile{
    color: black;
    padding: 0;
    text-align: center;
    position: relative;
    /* height: 3em; */
    transition: transform 400ms;
}

.mapTile:hover{
    transform: translateY(-.3em);
}

img{
    width: 100%;
    height: auto;
}

div.label{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -20%);
    font-size: .9em;

}

</style>