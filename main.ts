input.onButtonPressed(Button.A, function () {
    radio.setTransmitPower(1)
})
input.onButtonPressed(Button.AB, function () {
    basic.showString("Hello! My name is " + Name)
    radio.sendString("Hello " + Name + "!")
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
    datalogger.log(datalogger.createCV("Dialogue", receivedString.substr(0, 15)))
})
input.onButtonPressed(Button.B, function () {
    radio.setTransmitPower(7)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    Logging = 1
    basic.showString("Log:")
    basic.showString(Alphabet.substr(Letter, 1))
    while (!(input.logoIsPressed())) {
        if (input.buttonIsPressed(Button.A)) {
            if (Letter == 26) {
                datalogger.log(datalogger.createCV("Name", Log))
            } else if (Letter == 27) {
                Log = Log.substr(0, Log.length - 1)
            } else if (Letter == 28) {
                if (Alphabet == "abcdefghijklmnopqrstuvwxyz") {
                    Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                } else {
                    Alphabet = "abcdefghijklmnopqrstuvwxyz"
                }
            } else {
                Log = "" + Log + Alphabet.substr(Letter, 1)
            }
        }
        if (input.buttonIsPressed(Button.B)) {
            if (Letter == 25) {
                Letter += 1
                basic.showString("Done?")
            } else if (Letter == 26) {
                Letter += 1
                basic.showString("Back?")
            } else if (Letter == 27) {
                Letter += 1
                basic.showString("Caps lock?")
            } else if (Letter == 28) {
                Letter = 0
                basic.showString(Alphabet.substr(Letter, 1))
            } else {
                Letter += 1
                basic.showString(Alphabet.substr(Letter, 1))
            }
        }
    }
    basic.showString("Successfully logged.")
    Logging = 0
})
let Randomise = 0
let Log = ""
let Letter = 0
let Name = ""
let Alphabet = ""
let Logging = 0
let strip = neopixel.create(DigitalPin.P16, 2, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.White))
strip.show()
Logging = 0
Alphabet = "abcdefghijklmnopqrstuvwxyz"
datalogger.setColumnTitles("Dialogue")
radio.setGroup(1)
radio.setTransmitPower(7)
Name = "Ricky" + randint(1, 50)
Letter = 0
basic.showLeds(`
    # # . # #
    # # . # #
    # # . # #
    . . . . .
    . . . . .
    `)
basic.forever(function () {
    while (sonar.ping(
    DigitalPin.P8,
    DigitalPin.P12,
    PingUnit.Centimeters
    ) > 30) {
        servos.P0.run(65)
        servos.P1.run(65)
    }
    while (sonar.ping(
    DigitalPin.P8,
    DigitalPin.P12,
    PingUnit.Centimeters
    ) > 20) {
        servos.P0.run(45)
        servos.P1.run(45)
    }
    Randomise = randint(1, 2)
    if (Randomise == 1) {
        while (sonar.ping(
        DigitalPin.P8,
        DigitalPin.P12,
        PingUnit.Centimeters
        ) < 20 && sonar.ping(
        DigitalPin.P8,
        DigitalPin.P12,
        PingUnit.Centimeters
        ) > 10) {
            servos.P0.run(35)
            servos.P1.run(-35)
        }
    }
    if (Randomise == 2) {
        while (sonar.ping(
        DigitalPin.P8,
        DigitalPin.P12,
        PingUnit.Centimeters
        ) < 20 && sonar.ping(
        DigitalPin.P8,
        DigitalPin.P12,
        PingUnit.Centimeters
        ) > 10) {
            servos.P0.run(-35)
            servos.P1.run(35)
        }
    }
    Randomise = randint(1, 3)
    if (Randomise == 3) {
        basic.pause(200)
    }
})
basic.forever(function () {
    if (sonar.ping(
    DigitalPin.P8,
    DigitalPin.P12,
    PingUnit.Centimeters
    ) < 20) {
        music.play(music.tonePlayable(392, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    }
})
basic.forever(function () {
    if (sonar.ping(
    DigitalPin.P8,
    DigitalPin.P12,
    PingUnit.Centimeters
    ) < 20) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        strip.show()
        basic.pause(100)
        strip.showColor(neopixel.colors(NeoPixelColors.White))
        strip.show()
        basic.pause(100)
    } else {
        music.stopAllSounds()
    }
})
basic.forever(function () {
    if (sonar.ping(
    DigitalPin.P8,
    DigitalPin.P12,
    PingUnit.Centimeters
    ) < 10) {
        while (sonar.ping(
        DigitalPin.P8,
        DigitalPin.P12,
        PingUnit.Centimeters
        ) < 20) {
            servos.P0.run(45)
            servos.P1.run(45)
        }
    }
})
loops.everyInterval(randint(10000, 15000), function () {
    if (Logging == 0) {
        basic.showLeds(`
            # # . # #
            # # . # #
            # # . # #
            . . . . .
            . . . . .
            `)
        basic.pause(100)
        basic.showLeds(`
            . . . . .
            # # . # #
            # # . # #
            . . . . .
            . . . . .
            `)
        basic.pause(100)
        basic.showLeds(`
            . . . . .
            . . . . .
            # # . # #
            . . . . .
            . . . . .
            `)
        basic.pause(100)
        basic.showLeds(`
            . . . . .
            # # . # #
            # # . # #
            . . . . .
            . . . . .
            `)
        basic.pause(100)
        basic.showLeds(`
            # # . # #
            # # . # #
            # # . # #
            . . . . .
            . . . . .
            `)
    }
})
