<template>
    <div class="spoiler" @click="whenClicked">
        <h2 class="spoilerTitle" v-if="!wasRevealed">Show Results</h2>
        <div v-show="wasRevealed">
            <h2 class="spoilerText">{{ this.fightOutcome.message }}</h2>
            <p class="spoilerSubtext" v-show="this.fightOutcome.note">
                {{ this.fightOutcome.note }}
            </p>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {CUR_SPOILER_REVEALED} from '../../state/getters.js';
import {REVEAL_SPOILER} from '../../state/mutations.js';

export default {
    name: 'Spoiler',
    props: {
        fightOutcome: Object
    },
    data() {
        return {
            // isRevealed: false
        };
    },
    methods: {
        whenClicked() {
            this.$store.commit(REVEAL_SPOILER);
        }
    },
    computed: {
        ...mapGetters({
            wasRevealed: CUR_SPOILER_REVEALED
        })
    }
};
</script>

<style scoped>
.spoiler {
    padding: 0em 0.8em 0.6em 0.8em;
    color: black;
    background-color: #efefef;
    /* width: 90%; */
    white-space: pre;
    border: 4px solid black;

    /*zebra stripe*/
    background-image: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 20px,
        black 20px,
        black 40px
    );
    background-size: 100% 20%;
    background-repeat: no-repeat;
    background-position-y: 113%;
}

h2.spoilerTitle {
    margin-top: .1em;
    margin-bottom: .1em;
    padding: .2em;
    font-size: 1.6vw;
}

h2.spoilerText {
    margin-top: .1em;
    margin-bottom: .1em;
    padding: .2em;
    font-size: 1.6vw;
}

.spoilerTitle {
    cursor: pointer;
    margin: 0;
    padding: 1em;
}
.spoilerText {
    margin: 0;
    padding: 1em;
}
.spoilerSubtext {
    margin-top: 0;
    white-space: pre-wrap;
}
</style>