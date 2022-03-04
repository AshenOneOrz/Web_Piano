const Audio = class {
    constructor() {
        this._ctx = new AudioContext()
    }

    setup() {
        this._gainNode = this._ctx.createGain()
        this._osci = this._ctx.createOscillator()
        this._osci.connect(this._gainNode)
        this._gainNode.connect(this._ctx.destination)
        this._osci.type = 'sine'
    }

    start(frequency) {
        this.setup()
        log(frequency)
        this._osci.frequency.value = frequency
        
        let value = 1.3
        let endTime = 0.13
        this.setValueAtTimeExponential(value, endTime)

        setTimeout(() => {
            let v = 1
            let e = 0
            this.setValueAtTimeExponential(v, e)
        }, endTime * 1000);
        
        this._osci.start()
    }

    stop() {
        let v = 0
        let e = 0.8
        this.setValueAtTimeLinear(v, e)
    }

    setValueAtTimeExponential(value, endTime) {
        this._gainNode.gain.exponentialRampToValueAtTime(value, this._ctx.currentTime + endTime)
    }

    setValueAtTimeLinear(value, endTime) {
        this._gainNode.gain.linearRampToValueAtTime(value, this._ctx.currentTime + endTime)
    }


    mute() {
        this._gainNode.gain.setValueAtTimeLinear(0, 0)
    }
}

export default Audio
