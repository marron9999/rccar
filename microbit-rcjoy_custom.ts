

/**
* このファイルを使って、独自の関数やブロックを定義してください。
* 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
*/

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace custom {
    let prev: { [key: string]: string } = {}
    let pass: { [key: string]: number } = {}

    /**
     * prevString : check new value
     * @param n describe name
     * @param s describe value
     */
    //% block="prevString $n $v"
    //% blockId=custom_prevPass
    export function prevString(n: string, v: string): string {
        if (prev[n] == undefined) {
            prev[n] = v
            return v
        }
        if (prev[n] != v) {
            prev[n] = v
            return v
        }
        return ""
    }
    /**
     * prevNumber : check new value
     * @param n describe name
     * @param s describe value
     */
    //% block="prevNumber $n $v"
    //% blockId=custom_prevPassN
    export function prevNumber(n: string, v: number): string {
        return prevString(n, "" + v)
    }
    /**
     * prevBoolean : check new value
     * @param n describe name
     * @param s describe value
     */
    //% block="prevBoolean $n $v"
    //% blockId=custom_prevPassB
    export function prevBoolean(n: string, v: boolean): string {
        return prevString(n, (v) ? "1" : "0")
    }

    /**
     * lowPass : check low value
     * @param n describe name
     * @param s describe value
     */
    //% block="lowPass $n $v"
    //% blockId=custom_lowPass
    export function lowPass(n: string, v: number): number {
        let ALPHA = 0.15
        return lowPassX(n, v, ALPHA)
    }

    /**
     * lowPassX : check low value
     * @param n describe name
     * @param s describe value
     * @param a describe value
     */
    //% block="lowPassX $n $v $a"
    //% blockId=custom_lowPassX
    export function lowPassX(n: string, v: number, a: number): number {
        if (pass[n] == undefined) {
            pass[n] = v
            return v
        }
        v = pass[n] + a/*ALPHA*/ * (v - pass[n])
        pass[n] = v
        return v
    }

    /**
     * fixFloat : Fix float value
     * @param s describe value
     */
    //% block="fixFloat $v"
    //% blockId=custom_fixFloat
    export function fixFloat(v: number): number {
        return fixFloatX(v, 2)
    }

    /**
     * fixFloatX : Fix float value
     * @param s describe value
     * @param d describe value
     */
    //% block="fixFloatX $v $d"
    //% blockId=custom_fixFloatX
    export function fixFloatX(v: number, d: number): number {
        d = 10.0 ** d
        v = parseInt("" + (v * d)) / d
        return v
    }

    /**
     * split : split value
     * @param s describe value
     * @param d describe value
     */
    //% block="split $v $d"
    //% blockId=custom_split
    export function split(v: string, d: string): string[] {
        return v.split(d);
    }

    /**
     * split : first value
     * @param s describe value
     * @param d describe value
     */
    //% block="first $v $d"
    //% blockId=custom_first
    export function first(v: string, d: string): string[] {
        let p = v.indexOf(d);
        let s = v;
        if (p >= 0) {
            s = v.substr(0, p)
            v = v.substr(p + d.length)
        } else {
            v = ""
        }
        return [d, v];
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
        for (let y = 0; y < 5; y++) {
            n = led99_2[n2][y] * 8 + led99_1[n1][y]
            if (n & 0x01) led.plot(4, y)
            if (n & 0x02) led.plot(3, y)
            if (n & 0x04) led.plot(2, y)
            if (n & 0x08) led.plot(1, y)
            if (n & 0x10) led.plot(0, y)
        }
    }

}
