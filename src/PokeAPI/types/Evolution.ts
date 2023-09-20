import { NamedAPIResource, Name } from "./Utility";

export interface EvolutionChain {
	/** The identifier for this resource. */
	id: number;
	/** The item that a Pokemon would be holding when mating that would trigger the egg hatching a baby Pokemon rather than a basic Pokemon. */
	baby_trigger_item: NamedAPIResource;
	/** The base chain link object. Each link contains evolution details for a Pokemon in the chain. Each link references the next Pokemon in the natural evolution order. */
	chain: ChainLink;
}

export interface ChainLink {
	/** Whether or not this link is for a baby Pokemon. This would only ever be true on the base link. */
	is_baby: boolean;
	/** The Pokemon species at this point in the evolution chain. */
	species: NamedAPIResource;
	/** All details regarding the specific details of the referenced Pokemon species evolution. */
	evolution_details: EvolutionDetail[];
	/** A List of chain objects. */
	evolves_to: ChainLink[];
}

export interface EvolutionDetail {
	/** The item required to cause evolution this into Pokemon species. */
	item: NamedAPIResource;
	/** The type of event that triggers evolution into this Pokemon species. */
	trigger: NamedAPIResource;
	/** The id of the gender of the evolving Pokemon species must be in order to evolve into this Pokemon species. */
	gender: number;
	/** The item the evolving Pokemon species must be holding during the evolution trigger event to evolve into this Pokemon species. */
	held_item: NamedAPIResource;
	/** The move that must be known by the evolving Pokemon species during the evolution trigger event in order to evolve into this Pokemon species. */
	known_move: NamedAPIResource;
	/** The evolving Pokemon species must know a move with this type during the evolution trigger event in order to evolve into this Pokemon species. */
	known_move_type: NamedAPIResource;
	/** The location the evolution must be triggered at. */
	location: NamedAPIResource;
	/** The minimum required level of the evolving Pokemon species to evolve into this Pokemon species. */
	min_level: number;
	/** The minimum required level of happiness the evolving Pokemon species to evolve into this Pokemon species. */
	min_happiness: number;
	/** The minimum required level of beauty the evolving Pokemon species to evolve into this Pokemon species. */
	min_beauty: number;
	/** The minimum required level of affection the evolving Pokemon species to evolve into this Pokemon species. */
	min_affection: number;
	/** Whether or not it must be raining in the overworld to cause evolution this Pokemon species. */
	needs_overworld_rain: boolean;
	/** The Pokemon species that must be in the players party in order for the evolving Pokemon species to evolve into this Pokemon species. */
	party_species: NamedAPIResource;
	/** The player must have a Pokemon of this type in their party during the evolution trigger event in order for the evolving Pokemon species to evolve into this Pokemon species. */
	party_type: NamedAPIResource;
	/** The required relation between the Pokemon's Attack and Defense stats. 1 means Attack > Defense. 0 means Attack = Defense. -1 means Attack < Defense. */
	relative_physical_stats: number;
	/** The required time of day. Day or night. */
	time_of_day: string;
	/** Pokemon species for which this one must be traded. */
	trade_species: NamedAPIResource;
	/** Whether or not the 3DS needs to be turned upside-down as this Pokemon levels up. */
	turn_upside_down: boolean;
}

export interface EvolutionTrigger {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A list of pokemon species that result from this evolution trigger. */
	pokemon_species: NamedAPIResource[];
}

