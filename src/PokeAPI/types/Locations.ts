import {
	NamedAPIResource,
	Name,
	GenerationGameIndex,
	VersionEncounterDetail
} from "./Utility";

export interface Location {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The region this location can be found in. */
	region: NamedAPIResource;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A list of game indices relevent to this location by generation. */
	game_indices: GenerationGameIndex[];
	/** Areas that can be found within this location. */
	areas: NamedAPIResource[];
}

export interface LocationArea {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The internal id of an API resource within game data. */
	game_index: number;
	/** A list of methods in which Pokemon may be encountered in this area and how likely the method will occur depending on the version of the game. */
	encounter_method_rates: EncounterMethodRate[];
	/** The region this location area can be found in. */
	location: NamedAPIResource;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A list of Pokemon that can be encountered in this area along with version specific details about the encounter. */
	pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
	/** The method in which Pokemon may be encountered in an area.. */
	encounter_method: NamedAPIResource;
	/** The chance of the encounter to occur on a version of the game. */
	version_details: EncounterVersionDetails[];
}

export interface EncounterVersionDetails {
	/** The chance of an encounter to occur. */
	rate: number;
	/** The version of the game in which the encounter can occur with the given chance. */
	version: NamedAPIResource;
}

export interface PokemonEncounter {
	/** The Pokemon being encountered. */
	pokemon: NamedAPIResource;
	/** A list of versions and encounters with Pokemon that might happen in the referenced location area. */
	version_details: VersionEncounterDetail[];
}

export interface PalParkArea {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A list of Pokemon encountered in thi pal park area along with details. */
	pokemon_encounters: PalParkEncounterSpecies[];
}

export interface PalParkEncounterSpecies {
	/** The base score given to the player when this Pokemon is caught during a pal park run. */
	base_score: number;
	/** The base rate for encountering this Pokemon in this pal park area. */
	rate: number;
	/** The Pokemon species being encountered. */
	pokemon_species: NamedAPIResource;
}

export interface Region {
	/** The identifier for this resource. */
	id: number;
	/** A list of locations that can be found in this region. */
	locations: NamedAPIResource[];
	/** The name for this resource. */
	name: string;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** The generation this region was introduced in. */
	main_generation: NamedAPIResource;
	/** A list of pokedexes that catalogue Pokemon in this region. */
	pokedexes: NamedAPIResource[];
	/** A list of version groups where this region can be visited. */
	version_groups: NamedAPIResource[];
}

