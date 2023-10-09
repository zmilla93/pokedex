export const pokemonNames: string[] = require("Data/clean/pokemon.json") as string[];
export const pokemonTypes: string[] = require("Data/clean/types.json") as string[];
export const gameVersions: string[] = require("Data/clean/version_groups.json") as string[];

interface MappedGameVersion { [index: string]: string[]; }
export const gameVersionMap: MappedGameVersion = require("Data/clean/version_group_map.json") as MappedGameVersion;
