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
        datalogger.log(datalogger.createCV("Name", receivedString.substr(11, 12)))
    } else {
        datalogger.log(datalogger.createCV("Name", receivedString.substr(11, 11)))
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
let Randomise = 0
let Name = ""
datalogger.setColumnTitles("Name")
radio.setGroup(1)
radio.setTransmitPower(7)
Name = "Ricky" + randint(1, 50)
let Number2 = 1
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
})
