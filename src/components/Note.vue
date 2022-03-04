<template>
    <div :class="className" :id="id" @mousedown="onMousedown" @mouseup="onMouseup"></div>
</template>

<script>
import Bus from '../event-bus/bus'
export default {
    name: 'Note',
    props: {
        data: {
            type: Object,
            default: () => {},
        },
        index: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        className() {
            let data = this.data
            let pitchName = Array.isArray(data.pitchName) ? data.pitchName.join(' ') : data.pitchName
            return `note ${data.type} ${pitchName}`
        },
        id() {
            let data = this.data
            let index = this.index
            let pitchName = Array.isArray(data.pitchName) ? data.pitchName[1] + index : data.pitchName + index
            return `id-note-${pitchName}`
        },
    },
    methods: {
        onMousedown() {
            let data = this.data
            let index = this.index

            let pitchName = Array.isArray(data.pitchName) ? data.pitchName.map((pitchName) => pitchName + index).slice(0, 2) : [data.pitchName + index]
            Bus.$emit('mousedown', pitchName)
        },
        onMouseup() {
            Bus.$emit('mouseup')
        },
    },
}
</script>

<style lang="less" scoped>
.note {
    width: 30px;
    height: 150px;
    border: 1px solid #000;
    transition: background-image 0.2s ease;
}

.white {
    border-left: 1px solid rgb(104, 104, 104);
    border-right: 1px solid rgb(150, 150, 150);
    background-image: linear-gradient(130deg, #fff, rgb(241, 241, 241));
}
.white:active {
    background-image: linear-gradient(130deg, rgb(247, 247, 247), rgb(235, 235, 235));
    border-left: 2px solid rgb(0, 0, 0);
    border-right: 2px solid rgb(0, 0, 0);
}
.black {
    position: absolute;
    background-image: linear-gradient(130deg, #000, rgb(65, 63, 63));
    width: 20px;
    height: 110px;
    box-shadow: 3px 2px 6px rgb(85, 84, 84);
    border-right: 1px solid rgb(27, 27, 27);
    border-left: 1px solid rgb(255, 255, 255);
}
.black:active {
    background-image: linear-gradient(130deg, rgb(44, 44, 44), rgb(63, 63, 63));
    box-shadow: 0 0 4px rgb(192, 192, 192);
}

.bD {
    left: 20px;
}
.A0 {
    left: 20px !important;
}
.bE {
    left: (20px + 30px);
}
.bG {
    left: (30px * 3 + 20px);
}
.bA {
    left: (30px * 4 + 20px);
}
.bB {
    left: (30px * 5 + 20px);
}
</style>
