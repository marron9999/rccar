
/**
* このファイルを使って、独自の関数やブロックを定義してください。
* 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    let motors: Kitronik_Robotics_Board.Motors [] = [
        Kitronik_Robotics_Board.Motors.Motor1,
        Kitronik_Robotics_Board.Motors.Motor2,
        Kitronik_Robotics_Board.Motors.Motor3,
        Kitronik_Robotics_Board.Motors.Motor4,
    ]

    /**
     * motorOn : set moter
     * @param motor value
     * @param speed value
     */
    //% block="motorOn $motor $speed"
    //% blockId=custom_motorOn
    export function motorOn(motor: number, speed: number) {
        let f = 0
        if (speed < 0) {
            speed = - speed
            f = 1
        }
        if (speed > 100) speed = 100
        Kitronik_Robotics_Board.motorOn(motors[motor], f, speed)
    }

    /**
     * motorOff : off moter
     */
    //% block="motorOff"
    //% blockId=custom_motorOff
    export function motorOff() {
        for(let i=0; i<motors.length; i++) {
            Kitronik_Robotics_Board.motorOff(motors[i])
        }
    }

    let led99_1: number[][] = [
        [7, 5, 5, 5, 7], [1, 1, 1, 1, 1], [7, 1, 7, 4, 7], [7, 1, 7, 1, 7],
        [4, 5, 5, 7, 1], [7, 4, 7, 1, 7], [4, 4, 7, 5, 7], [7, 1, 1, 1, 1],
        [7, 5, 7, 5, 7], [7, 5, 7, 1, 1],
    ];
    let led99_2: number[][] = [
        [0, 0, 0, 0, 0], [1, 1, 1, 1, 1], [3, 1, 3, 2, 3], [3, 1, 3, 1, 3],
        [2, 3, 3, 3, 1], [3, 2, 3, 1, 3], [3, 2, 3, 3, 3], [3, 1, 1, 1, 1],
        [3, 3, 3, 3, 3], [3, 3, 3, 1, 3],
    ];
    /**
     * led99 : show no on led
     * @param n value
     */
    //% block="led99 $n"
    //% blockId=custom_led99
    export function led99(n: number) {
        basic.clearScreen()
        let n1 = n % 10;
        let n2 = ((n - n1) / 10) % 10;
        for(let y=0; y<5; y++) {
            n = led99_2[n2][y] * 8 + led99_1[n1][y]
            if (n & 0x01) led.plot(4, y)
            if (n & 0x02) led.plot(3, y)
            if (n & 0x04) led.plot(2, y)
            if (n & 0x08) led.plot(1, y)
            if (n & 0x10) led.plot(0, y)
        }
    }

    let _sounds = [
        "giggle", "happy", "hello", "mysterious", "sad",
        "slide", "soaring", "spring", "twinkle", "yawn"]

    /**
     * sound
     * @param no
     */
    //% block="sounds $n"
    //% block.loc.ja="サウンド $n"
    //% blockId=custom_sounds
    export function sounds(n: number): string {
        return _sounds[n];
    }

    let _leds = [
        /*happy*/   "1b1b00110e",
        /*l wink*/  "031b00110e",
        /*r wink*/  "181b00110e",
        /*anger*/   "1b1b000e11",
        /*sound*/   "0406051c1c",
    ];

    function led_y(y: number, hex: string) {
        let x = parseInt(hex, 16)
        if (x == 0) {
            led.unplot(0, y)
            led.unplot(1, y)
            led.unplot(2, y)
            led.unplot(3, y)
            led.unplot(4, y)
            return
        }
        if ((x & 0x10) != 0)
            led.plot(0, y)
        else led.unplot(0, y)
        if ((x & 0x08) != 0)
            led.plot(1, y)
        else led.unplot(1, y)
        if ((x & 0x04) != 0)
            led.plot(2, y)
        else led.unplot(2, y)
        if ((x & 0x02) != 0)
            led.plot(3, y)
        else led.unplot(3, y)
        if ((x & 0x01) != 0)
            led.plot(4, y)
        else led.unplot(4, y)
    }

    /**
     * cls
     */
    //% block="led|cls"
    //% block.loc.ja="LEDクリア"
    //% blockId=custom_led_cls
    export function cls() {
        for (let y = 0; y <= 4; y++)
            led_y(y, "00")
    }

    /**
     * leds
     * @param no
     */
    //% block="leds $no"
    //% block.loc.ja="LED $no"
    //% blockId=custom_leds
    export function leds(no: number) {
        if (no < 0
            || no >= _leds.length) {
            cls()
            return;
        }
        ledx(_leds[no])
    }

    /**
     * leds
     * @param no
     */
    //% block="ledx $pattern"
    //% block.loc.ja="LEDパターン $pattern"
    //% blockId=custom_ledx
    export function ledx(pattern: string) {
        if (pattern.length % 2 != 0)
            pattern = "0" + pattern
        pattern += "0000000000"
        for (let y = 0, o = 0; y <= 4; y++, o += 2) {
            led_y(y, pattern.charAt(o) + pattern.charAt(o + 1))
        }
    }

    /**
     * trim
     * @param text
     */
    //% block="trim $text"
    //% block.loc.ja="トリム $text"
    //% blockId=custom_trim
    export function trim(text: string): string {
        return text.trim()
    }
}
