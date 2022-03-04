<template>
    <div class="page">
        <template v-for="data in compass">
            <Octave :data="data" />
        </template>
    </div>
</template>

<script>
import compass from '../config/compass'
import frequencies from '../config/frequencies'
import Audio from '../audio-controller/audioController'
import Bus from '../event-bus/bus'

import Octave from '../components/Octave.vue'

export default {
    name: 'Index',
    components: {
        Octave,
    },
    data() {
        return {
            aduio: null,
            compass,
            pitchNameMapper: {
                a: 'C4',
                s: 'D4',
                d: 'E4',
                f: 'F4',
                g: 'G4',
                h: 'A4',
                j: 'B4',
                // 黑键
                w: 'C4#',
                e: 'D4#',
                t: 'F4#',
                y: 'G4#',
                u: 'A4#',
            },
            gainNode: null,
            ctx: null,
            notesStatus: [
                {
                    note: 'a',
                    pressState: false,
                },
                {
                    note: 's',
                    pressState: false,
                },
                {
                    note: 'd',
                    pressState: false,
                },
                {
                    note: 'f',
                    pressState: false,
                },
                {
                    note: 'g',
                    pressState: false,
                },
                {
                    note: 'h',
                    pressState: false,
                },
                {
                    note: 'j',
                    pressState: false,
                },
                {
                    note: 'w',
                    pressState: false,
                },
                {
                    note: 'e',
                    pressState: false,
                },
                {
                    note: 't',
                    pressState: false,
                },
                {
                    note: 'y',
                    pressState: false,
                },
                {
                    note: 'u',
                    pressState: false,
                },
            ],
        }
    },
    mounted() {
        Bus.$on('mousedown', (pitchName) => {
            this.onMousedown(pitchName)
        })

        Bus.$on('mouseup', () => {
            this.onMouseup()
        })

        document.addEventListener('notedown', ({ note }) => {
            if (['a', 's', 'd', 'f', 'g', 'h', 'j', 'w', 'e', 't', 'y', 'u'].includes(note)) {
                this.onNotedown(note)
            }
        })

        document.addEventListener('noteup', ({ note }) => {
            if (['a', 's', 'd', 'f', 'g', 'h', 'j', 'w', 'e', 't', 'y', 'u'].includes(note)) {
                this.onNoteup(note)
            }
        })

        this.audio = new Audio()
    },
    methods: {
        setNoteStatus(note, pressState) {
            let k = this.notesStatus.filter((item) => {
                return item.note === note
            })[0]

            k.pressState = pressState
        },
        onNotedown(note) {
            let k = this.notesStatus.filter((item) => {
                return item.note === note
            })[0]

            if (k.pressState) {
                return
            } else {
                this.setNoteStatus(note, true)
            }

            let pitchName = this.pitchNameMapper[note]
            let frequency = frequencies[pitchName]

            this.audio.start(frequency)
            log(pitchName, frequency)
        },
        onMousedown(pitchName) {
            let frequency = frequencies[pitchName[0]]
            this.audio.start(frequency)
        },
        onMouseup() {
            this.audio.stop()
        },
        onNoteup(note) {
            this.setNoteStatus(note, false)
            this.audio.stop()
        },
    },
}
</script>

<style lang="less" scoped>
.page {
    display: flex;
}
</style>
