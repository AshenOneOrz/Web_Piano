<template>
    <div class="page">
        <template v-for="data in compass">
            <Octave :data="data" />
        </template>
    </div>
</template>

<script>
import compass from '../config/compass'
import Octave from '../components/Octave.vue'

import Audio from '../audio-controller/audioController'
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
            frequencies: {
                C4: 261,
                'C4#': 277,
                D4: 293,
                'D4#': 311,
                E4: 329,
                F4: 349,
                'F4#': 369,
                G4: 391,
                'G4#': 415,
                A4: 440,
                'A4#': 466,
                B4: 493,
            },
            gainNode: null,
            ctx: null,
            keysStatus: [
                {
                    key: 'a',
                    pressState: false,
                },
                {
                    key: 's',
                    pressState: false,
                },
                {
                    key: 'd',
                    pressState: false,
                },
                {
                    key: 'f',
                    pressState: false,
                },
                {
                    key: 'g',
                    pressState: false,
                },
                {
                    key: 'h',
                    pressState: false,
                },
                {
                    key: 'j',
                    pressState: false,
                },
                {
                    key: 'w',
                    pressState: false,
                },
                {
                    key: 'e',
                    pressState: false,
                },
                {
                    key: 't',
                    pressState: false,
                },
                {
                    key: 'y',
                    pressState: false,
                },
                {
                    key: 'u',
                    pressState: false,
                },
            ],
        }
    },
    mounted() {
        document.addEventListener('keydown', ({ key }) => {
            if (['a', 's', 'd', 'f', 'g', 'h', 'j', 'w', 'e', 't', 'y', 'u'].includes(key)) {
                this.onKeydown(key)
            }
        })

        document.addEventListener('keyup', ({ key }) => {
            if (['a', 's', 'd', 'f', 'g', 'h', 'j', 'w', 'e', 't', 'y', 'u'].includes(key)) {
                this.onKeyup(key)
            }
        })

        this.audio = new Audio()
    },
    methods: {
        setKeyStatus(key, pressState) {
            let k = this.keysStatus.filter((item) => {
                return item.key === key
            })[0]
            
            k.pressState = pressState
        },
        onKeydown(key) {
            let k = this.keysStatus.filter((item) => {
                return item.key === key
            })[0]

            if (k.pressState) {
                return
            } else {
                this.setKeyStatus(key, true)
            }

            let pitchName = this.pitchNameMapper[key]
            let frequency = this.frequencies[pitchName]

            this.audio.start(frequency)
            log(pitchName, frequency)
        },
        onKeyup(key) {
            this.setKeyStatus(key, false)
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
