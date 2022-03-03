<template>
    <div class="octave">
        <!-- 钢琴一共 88 个键位，分为 7 个八度 84 个键 + 最左侧的 A #A b 三个键 + 最右侧的 C 一个键 -->
        <!-- 钢琴有 7 个八度， 每个八度有 12 个键位 -->
        <!-- 白键有 CDEFGAB 7 个键 -->
        <!-- 黑键有 #C #D #F #G #A 5个键 -->
        <template v-for="(key) in data.octave">
            <Key :data="key" />
        </template>
    </div>
</template>

<script>
import Key from './Key.vue'

export default {
    name: 'Octave',
    components: {
        Key,
    },
    props: {
        data: {
            type: Object,
            default: () => {},
        },
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
.octave {
    display: flex;
    position: relative;
}
</style>
