input.onButtonPressed(Button.A, function () {
    radio.setTransmitPower(1)
})
input.onButtonPressed(Button.AB, function () {
    basic.showString("Hello! My name is " + Name)
    radio.sendString("Hello " + Name + "!")
})
radio.onReceivedString(function (receivedString) {
    basic.showString(receivedString)
    if (receivedString.length == 24) {
        datalogger.log(datalogger.createCV("Name", receivedString.substr(6, 12)))
    } else {
        datalogger.log(datalogger.createCV("Name", receivedString.substr(6, 11)))
    }
})
input.onButtonPressed(Button.B, function () {
    radio.setTransmitPower(7)
})
input.onGesture(Gesture.Shake, function () {
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
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showString("Log:")
    while (!(input.logoIsPressed())) {
        if (input.buttonIsPressed(Button.A)) {
            if (Letter == 27) {
                datalogger.log(datalogger.createCV("Name", Log))
            } else if (Letter == 28) {
                Log = Log.substr(0, Log.length - 1)
            } else if (Letter == 29) {
                if (Alphabet == "abcdefghijklmnopqrstuvwxyz") {
                    Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                } else {
                    Alphabet = "abcdefghijklmnopqrstuvwxyz"
                }
            } else {
                Log = "" + Log + Alphabet.substr(Letter, Letter)
            }
        }
        if (input.buttonIsPressed(Button.B)) {
            if (Letter == 26) {
                Letter += 1
                basic.showString("Done?")
            } else if (Letter == 27) {
                Letter += 1
                basic.showString("Back?")
            } else if (Letter == 28) {
                Letter += 1
                basic.showString("Caps lock?")
            } else if (Letter == 29) {
                Letter = 1
                basic.showString(Alphabet.substr(Letter, Letter))
            } else {
                Letter += 1
                basic.showString(Alphabet.substr(Letter, Letter))
            }
        }
    }
    basic.showString("Successfully logged.")
})
let Randomise = 0
let Log = ""
let Letter = 0
let Name = ""
let Alphabet = ""
Alphabet = "abcdefghijklmnopqrstuvwxyz"
datalogger.setColumnTitles("Name")
radio.setGroup(1)
radio.setTransmitPower(7)
Name = "Ricky" + randint(1, 50)
Letter = 1
basic.showLeds(`
    # # . # #
    # # . # #
    # # . # #
    . . . . .
    . . . . .
    `)
basic.forever(function () {
    while (sonar.ping(
    DigitalPin.P10,
    DigitalPin.P9,
    PingUnit.Centimeters
    ) > 20) {
        servos.P0.run(65)
        servos.P1.run(65)
    }
    Randomise = randint(1, 2)
    if (Randomise == 1) {
        while (sonar.ping(
        DigitalPin.P10,
        DigitalPin.P9,
        PingUnit.Centimeters
        ) < 20) {
            servos.P0.run(35)
            servos.P1.run(-35)
        }
    }
    if (Randomise == 2) {
        while (sonar.ping(
        DigitalPin.P10,
        DigitalPin.P9,
        PingUnit.Centimeters
        ) < 20) {
            servos.P0.run(-35)
            servos.P1.run(35)
        }
    }
    Randomise = randint(1, 3)
    if (Randomise == 3) {
        basic.pause(200)
    }
})
