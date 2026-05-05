export const LIGHTS = {
    all: "a02p",

    dim1: "a01c",
    dim2: "a01f",

    hallway: "a001",
    bedroom: "a00j",

    rgb: {
        living: { base: "a013", r: "a015", g: "a016", b: "a017", brightness: "a014" },
        bedroom: { base: "a031", r: "a033", g: "a034", b: "a035", brightness: "a032" },
        hallway: { base: "a02s", r: "a02u", g: "a02v", b: "a02w", brightness: "a02t" },
    },
} as const;

export type Room = "living" | "bedroom" | "hallway";