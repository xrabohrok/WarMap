<template>
    <div class="mapTile">
        <img src="../assets/mapTiles/map-tile.png">
        <div class="label">
            {{title}}
        </div>
    </div>
</template>

<script>

export default {
    name: 'MapTile',
    props: {
        title: String
    }
}

</script>

<style scoped>

div.maptile{
    color: black;
    padding: .3em;
    text-align: center;
}

div.label{
    position: absolute;
    top: 50%;
    left: 50%;

}

</style>