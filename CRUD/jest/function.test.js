const { add, subtract, multiply, arrayOperation } = require("./function");

describe("group testing", () => {

    test("adding two number", async () => {
        await expect(add(5, 5)).toStrictEqual(10)
        await expect(add(500, 100)).toStrictEqual(600)
        await expect(() => add('5', 5)).toThrowError(Error('Inputs should be numbers'))

    })

    test("subtract two number", async () => {
        await expect(subtract(5, 5)).toStrictEqual(0)
        await expect(subtract(500, 100)).toStrictEqual(400)
        await expect(() => subtract('5', 5)).toThrowError(Error('Inputs should be numbers'))

    })

    test("multiply two number", async () => {
        await expect(multiply(5, 5)).toStrictEqual(25)
        await expect(multiply(500, 100)).toStrictEqual(50000)
        await expect(() => multiply('5', 5)).toThrowError(
            Error('Inputs should be numbers')
        )

    })

    test("success array operation testing", () => {
        expect(arrayOperation([1, 2, 3], [1, 2, 3])).resolves.toEqual([1, 4, 9])
        expect(arrayOperation([5, 6, 7], [1, 2, 3])).resolves.toEqual([5, 12, 21])

    })


})
