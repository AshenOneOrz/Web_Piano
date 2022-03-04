<template>
    <div class="octave">
        <!-- 钢琴一共 88 个键位，分为 7 个八度 84 个键 + 最左侧的 A #A b 三个键 + 最右侧的 C 一个键 -->
        <!-- 钢琴有 7 个八度， 每个八度有 12 个键位 -->
        <!-- 白键有 CDEFGAB 7 个键 -->
        <!-- 黑键有 #C #D #F #G #A 5个键 -->
        <template v-for="(note) in data.octave">
            <Note :data="note" :index='data.rangeIndex' />
        </template>
    </div>
</template>

<script>
import Note from './Note.vue'

export default {
    name: 'Octave',
    components: {
        Note,
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
