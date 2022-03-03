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
export default {
    name: 'Index',
    components: {
        Octave,
    },
    data() {
        return {
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
            frequencyMapper: {
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
                    status: false,
                },
                {
                    key: 's',
                    status: false,
                },
                {
                    key: 'd',
                    status: false,
                },
                {
                    key: 'f',
                    status: false,
                },
                {
                    key: 'g',
                    status: false,
                },
                {
                    key: 'h',
                    status: false,
                },
                {
                    key: 'j',
                    status: false,
                },
                {
                    key: 'w',
                    status: false,
                },
                {
                    key: 'e',
                    status: false,
                },
                {
                    key: 't',
                    status: false,
                },
                {
                    key: 'y',
                    status: false,
                },
                {
                    key: 'u',
                    status: false,
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
    },
    methods: {
        setKeyStatus(key, status) {
            let k = this.keysStatus.filter((item) => {
                return item.key === key
            })[0]
            k.status = status
        },
        onKeydown(key) {
            let k = this.keysStatus.filter((item) => {
                return item.key === key
            })[0]

            if (k.status) {
                return
            } else {
                this.setKeyStatus(key, true)
            }
            let pitchName = this.pitchNameMapper[key]
            let ctx = new AudioContext()
            this.ctx = ctx
            let gainNode = ctx.createGain()
            this.gainNode = gainNode
            let osci = ctx.createOscillator()
            gainNode.value = 0
            // 在 0.1 秒内让声音达到 1.3 a
            this.gainNode.gain.exponentialRampToValueAtTime(1.3, this.ctx.currentTime + 0.13)
            // 这之后让声音保持在 1
            setTimeout(() => {
                this.gainNode.gain.exponentialRampToValueAtTime(1, 0)
            }, 130)
            osci.connect(gainNode)
            gainNode.connect(ctx.destination)
            let frequency = this.frequencyMapper[pitchName]
            osci.frequency.value = frequency
            log(pitchName, frequency)

            osci.start()
        },
        onKeyup(key) {
            this.setKeyStatus(key, false)
            this.gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1)
            setTimeout(() => {
                this.gainNode.gain.setValueAtTime(0, 0)
            }, 1000)
        },
    },
}
</script>

<style lang="less" scoped>
.page {
    display: flex;
}
.octave {
    display: flex;
    position: relative;
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
    .sharp-C {
        left: 20px;
    }
    .sharp-D {
        left: (20px + 30px);
    }
    .sharp-F {
        left: (30px * 3 + 20px);
    }
    .sharp-G {
        left: (30px * 4 + 20px);
    }
    .sharp-A {
        left: (30px * 5 + 20px);
    }
}
</style>
