/**
 * A seedable random number generator that uses Mulberry32.
 * https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
 */
export class RNG {
    private static seed = 0;

    static setSeed(seed: number) {
        RNG.seed = seed;
    }

    static getSeed() {
        return RNG.seed;
    }

    /**
     * Generate a random number within a given range.
     * @param min Min random value (inclusive)
     * @param max Max random value (exclusive)
     * @returns Random integer.
     */
    static getRandom(min: number, max: number) {
        let t = RNG.seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        const rng = ((t ^ t >>> 14) >>> 0) / 4294967296;
        return Math.floor(rng * (max - min) + min);
    }

    /**
     * Generates an array of random numbers.
     * @param min Min random value (inclusive)
     * @param max Max random value (exclusive)
     * @param count Number or random numbers to generate
     * @param unique Should random numbers be unique (default false)
     * @returns An array of random numbers.
     */
    static getRandomArray(min: number, max: number, count: number, unique: boolean = false) {
        const range = max - min;
        if (count > range && unique) throw new Error(`Requested more unique random numbers (${count}) than can fit within the given range (${range})!`);
        const randomValues: number[] = [];
        // FIXME: This isn't a very good way to guarantee uniqueness if this function were used a lot, but is perfectly fine for current use case.
        while (randomValues.length < count) {
            const rng = RNG.getRandom(min, max);
            if (!randomValues.includes(rng) || !unique) randomValues.push(rng);
        }
        return randomValues;
    }
}