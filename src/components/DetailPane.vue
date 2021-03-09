<template>
    <div id=majorPane>
        <div class="row close">
            click me to close
        </div>

        <div class="subContent">
            <div class="combatant bastion">
                <FighterDetails :fighterId="'bastion fighter'"/>
            </div>

            <div class="details">
                <div class="row">
                    <div class="blockText outcome">
                        Put the outcome text here.
                    </div>
                </div>
                <div class="row">
                    <div class="blockText areaDescription">
                        <p><b>Area Description:</b> Area Name</p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices vitae auctor eu augue ut lectus arcu. Tincidunt augue interdum velit euismod in. Viverra nibh cras pulvinar mattis nunc sed. Ac tortor dignissim convallis aenean et tortor. Nec tincidunt praesent semper feugiat. Scelerisque purus semper eget duis. Sem fringilla ut morbi tincidunt augue interdum velit euismod in. Ipsum consequat nisl vel pretium lectus quam. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Nullam ac tortor vitae purus faucibus ornare suspendisse sed.

                        Ultrices in iaculis nunc sed augue. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Blandit aliquam etiam erat velit scelerisque. Libero nunc consequat interdum varius sit amet mattis vulputate. Porttitor massa id neque aliquam. Sed tempus urna et pharetra. Nisl tincidunt eget nullam non nisi est. Aliquam faucibus purus in massa tempor nec feugiat nisl. Tempus urna et pharetra pharetra. Lorem donec massa sapien faucibus et molestie. Eu feugiat pretium nibh ipsum. Praesent tristique magna sit amet purus gravida. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. At auctor urna nunc id cursus metus aliquam eleifend mi.

                    </div>
                </div>
            </div>    
            <div class="combatant pyre">
                <FighterDetails :fighterId="'pyre fighter'"/>
            </div>
        </div>
            
    </div>

</template>

<script>
import FighterDetails from './FightPane/FighterDetails.vue'

export default {
    components:{
        FighterDetails
    },
    name: 'DetailPane'
}
</script>

<style scoped>
.close{
    width:100%;
    order:0;
    font-size: 1.5;
}

.blockText{
    font-size: 1.8em;
    margin-bottom: .9em;
}

#majorPane{

    width: 100%;
}

.subContent{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    width:100%;
}

.row{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items:flex-start;
}

.combatant{
    width:20%;
    min-width: 37vh;
    margin-bottom: .7em;

}

.bastion{
    order: 1;
}

.pyre{
    order: 3;
}

.details{
    margin-top: .4em;
    order: 2;
    min-width: 20vw;
    width: 40%;
}

@media all and (orientation: portrait) {
    .subContent{
        flex-flow:wrap; 
        height: 100px;
    }
    .details {
        width: 100%;
        order: 3;
    }

    .pyre{
        width: 80%;
        order: 2;
    }

    .bastion{
        order: 1;
        width: 80%;
    }

    .left{
        width: 50%;
    }
}


</style>