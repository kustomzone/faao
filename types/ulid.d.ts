/** Declaration file generated by dts-gen */

export = ulid;

declare function ulid(): string;

declare namespace ulid {
    const prototype: {
    };

    function encodeRandom(len: any): any;

    function encodeTime(now: any, len: any): any;

    function prng(): any;

    namespace encodeRandom {
        const prototype: {
        };

    }

    namespace encodeTime {
        const prototype: {
        };

    }

    namespace prng {
        const prototype: {
        };

    }

}
