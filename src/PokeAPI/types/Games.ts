import { NamedAPIResource, Name, Description } from "./Utility";

export interface Generation {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** A list of abilities that were introduced in this generation. */
	abilities: NamedAPIResource[];
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** The main region travelled in this generation. */
	main_region: NamedAPIResource;
	/** A list of moves that were introduced in this generation. */
	moves: NamedAPIResource[];
	/** A list of Pokemon species that were introduced in this generation. */
	pokemon_species: NamedAPIResource[];
	/** A list of types that were introduced in this generation. */
	types: NamedAPIResource[];
	/** A list of version groups that were introduced in this generation. */
	version_groups: NamedAPIResource[];
}

export interface Pokedex {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** Whether or not this Pokedex originated in the main series of the video games. */
	is_main_series: boolean;
	/** The description of this resource listed in different languages. */
	descriptions: Description[];
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A list of Pokemon catalogued in this Pokedex and their indexes. */
	pokemon_entries: PokemonEntry[];
	/** The region this Pokedex catalogues Pokemon for. */
	region: NamedAPIResource;
	/** A list of version groups this Pokedex is relevant to. */
	version_groups: NamedAPIResource[];
}

export interface PokemonEntry {
	/** The index of this Pokemon species entry within the Pokedex. */
	entry_number: number;
	/** The Pokemon species being encountered. */
	pokemon_species: NamedAPIResource;
}

export interface Version {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** The version group this version belongs to. */
	version_group: NamedAPIResource;
}

export interface VersionGroup {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** Order for sorting. Almost by date of release, except similar versions are grouped together. */
	order: number;
	/** The generation this version was introduced in. */
	generation: NamedAPIResource;
	/** A list of methods in which Pokemon can learn moves in this version group. */
	move_learn_methods: NamedAPIResource[];
	/** A list of Pokedexes introduces in this version group. */
	pokedexes: NamedAPIResource[];
	/** A list of regions that can be visited in this version group. */
	regions: NamedAPIResource[];
	/** The versions this version group owns. */
	versions: NamedAPIResource[];
}

