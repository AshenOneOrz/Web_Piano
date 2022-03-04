<template>
    <div
        :class="className"
        :id="id"
    ></div>
</template>

<script>
export default {
    name: 'Key',
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
            return `key ${data.type} ${pitchName}`
        },
        id() {
            let data = this.data
            let index = this.index
            let pitchName = Array.isArray(data.pitchName) ? data.pitchName[1] + index : data.pitchName + index
            return `id-key-${pitchName}`
        }
    },
    data() {
        return {}
    },
    created() {
        // log(this.data)
    },
}
</script>

<style lang="less" scoped>
.key {
    width: 30px;
    height: 150px;
    border: 1px solid #000;
    border-left: 1px solid rgb(104, 104, 104);
    border-right: 1px solid rgb(150, 150, 150);
}
.white {
    background-image: linear-gradient(130deg, #fff, rgb(241, 241, 241));
}
.black {
    position: absolute;
    background-image: linear-gradient(130deg, #000, rgb(65, 63, 63));
    width: 20px;
    height: 110px;
    box-shadow: 2px 1px 4px rgb(85, 84, 84);
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
