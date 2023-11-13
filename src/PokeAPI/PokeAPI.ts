import { Berry, BerryFirmness, BerryFlavor } from './types/Berries';
import { ContestEffect, ContestType, SuperContestEffect } from './types/Contests';
import { EncounterCondition, EncounterConditionValue, EncounterMethod } from './types/Encounters';
import { EvolutionChain, EvolutionTrigger } from './types/Evolution';
import { Generation, Pokedex, Version, VersionGroup } from './types/Games';
import { Item, ItemAttribute, ItemCategory, ItemFlingEffect, ItemPocket } from './types/Items';
import { LocationArea, PalParkArea, Region } from './types/Locations';
import { Machine } from './types/Machines';
import { Move, MoveAilment, MoveBattleStyle, MoveCategory, MoveDamageClass, MoveLearnMethod, MoveTarget } from './types/Moves';
import { Ability, Characteristic, EggGroup, Gender, GrowthRate, LocationAreaEncounter, Nature, PokeathlonStat, Pokemon, PokemonColor, PokemonForm, PokemonHabitat, PokemonShape, PokemonSpecies, Stat, Type } from './types/Pokemon';
import { Language } from './types/Utility';

type NameOrId = string | number;
interface PokemonCache { [key: string]: Promise<object>; }

export class PokeApi {
	static URL = 'https://pokeapi.co/api/v2/';

	private cache: PokemonCache = {};
	private fetchCount = 0;
	private cacheHitCount = 0;

	/**
	 * Fetches data from the pokemon API, caches the result, then returns a promise.
	 * 
	 * @param endpoint The target PokeAPI endpoint. IE '/pokemon/charmander'
	 * @param limit (Optional) Pagination limit, default 9999
	 * @returns Promise<T> for the requested endpoint
	 */
	request<T>(endpoint: string, limit = 0): Promise<T> {
		endpoint = endpoint.toLowerCase();
		if (limit === -1) limit = 9999;
		const dataLimit = limit === 0 ? "" : `limit=${limit}`;
		let response = this.cache[endpoint];
		if (response !== undefined) this.cacheHitCount++;
		else {
			this.fetchCount++;
			if (!endpoint.startsWith("http")) endpoint = PokeApi.URL + endpoint;
			const target = limit > 0 ? endpoint + "?" + dataLimit : endpoint;
			response = fetch(target)
				.then(data => {
					if (!data.ok || data.status !== 200) throw new Error(`Failed to fetch data from '${endpoint}', status '${data.status}'.`);
					return data.json();
				})
				.catch(e => { console.error(e); return undefined; });
			this.cache[endpoint] = response;
		}
		return response as Promise<T>;
	}

	// API endpoint aliases

	/** Berries are small fruits that can provide HP and status condition restoration, stat enhancement, and even damage negation when eaten by Pokemon. Check out Bulbapedia for greater detail. */
	getBerry(nameOrId: NameOrId) {
		return this.request<Berry>(`berry/${nameOrId}/`);
	}

	/** Berries can be soft or hard. Check out Bulbapedia for greater detail. */
	getBerryFirmness(nameOrId: NameOrId) {
		return this.request<BerryFirmness>(`berry-firmness/${nameOrId}/`);
	}

	/** Flavors determine whether a Pokemon will benefit or suffer from eating a berry based on their nature. Check out Bulbapedia for greater detail. */
	getBerryFlavor(nameOrId: NameOrId) {
		return this.request<BerryFlavor>(`berry-flavor/${nameOrId}/`);
	}

	/** Contest types are categories judges used to weigh a Pokemon's condition in Pokemon contests. Check out Bulbapedia for greater detail. */
	getContestType(nameOrId: NameOrId) {
		return this.request<ContestType>(`contest-type/${nameOrId}/`);
	}

	/** Contest effects refer to the effects of moves when used in contests. */
	getContestEffect(id: number) {
		return this.request<ContestEffect>(`contest-effect/${id}/`);
	}

	/** Super contest effects refer to the effects of moves when used in super contests. */
	getSuperContestEffect(id: number) {
		return this.request<SuperContestEffect>(`super-contest-effect/${id}/`);
	}

	/** Methods by which the player might can encounter Pokemon in the wild, e.g., walking in tall grass. Check out Bulbapedia for greater detail. */
	getEncounterMethod(nameOrId: NameOrId) {
		return this.request<EncounterMethod>(`encounter-method/${nameOrId}/`);
	}

	/** Conditions which affect what pokemon might appear in the wild, e.g., day or night. */
	getEncounterCondition(nameOrId: NameOrId) {
		return this.request<EncounterCondition>(`encounter-condition/${nameOrId}/`);
	}

	/** Encounter condition values are the various states that an encounter condition can have, i.e., time of day can be either day or night. */
	getEncounterConditionValue(nameOrId: NameOrId) {
		return this.request<EncounterConditionValue>(`encounter-condition-value/${nameOrId}/`);
	}

	/** Evolution chains are essentially family trees. They start with the lowest stage within a family and detail evolution conditions for each as well as Pokemon they can evolve into up through the hierarchy. */
	getEvolutionChain(id: number) {
		return this.request<EvolutionChain>(`evolution-chain/${id}/`);
	}

	/** Evolution triggers are the events and conditions that cause a Pokemon to evolve. Check out Bulbapedia for greater detail. */
	getEvolutionTrigger(nameOrId: NameOrId) {
		return this.request<EvolutionTrigger>(`evolution-trigger/${nameOrId}/`);
	}

	/** A generation is a grouping of the Pokemon games that separates them based on the Pokemon they include. In each generation, a new set of Pokemon, Moves, Abilities and Types that did not exist in the previous generation are released. */
	getGeneration(nameOrId: NameOrId) {
		return this.request<Generation>(`generation/${nameOrId}/`);
	}

	/** A Pokedex is a handheld electronic encyclopedia device; one which is capable of recording and retaining information of the various Pokemon in a given region with the exception of the national dex and some smaller dexes related to portions of a region. See Bulbapedia for greater detail. */
	getPokedex(nameOrId: NameOrId) {
		return this.request<Pokedex>(`pokedex/${nameOrId}/`);
	}

	/** Versions of the games, e.g., Red, Blue or Yellow. */
	getVersion(nameOrId: NameOrId) {
		return this.request<Version>(`version/${nameOrId}/`);
	}

	/** Version groups categorize highly similar versions of the games. */
	getVersionGroup(nameOrId: NameOrId) {
		return this.request<VersionGroup>(`version-group/${nameOrId}/`);
	}

	/** An item is an object in the games which the player can pick up, keep in their bag, and use in some manner. They have various uses, including healing, powering up, helping catch Pokemon, or to access a new area. */
	getItem(nameOrId: NameOrId) {
		return this.request<Item>(`item/${nameOrId}/`);
	}

	/** Item attributes define particular aspects of items, e.g. "usable in battle" or "consumable". */
	getItemAttribute(nameOrId: NameOrId) {
		return this.request<ItemAttribute>(`item-attribute/${nameOrId}/`);
	}

	/** Item categories determine where items will be placed in the players bag. */
	getItemCategory(nameOrId: NameOrId) {
		return this.request<ItemCategory>(`item-category/${nameOrId}/`);
	}

	/** The various effects of the move "Fling" when used with different items. */
	getItemFlingEffect(nameOrId: NameOrId) {
		return this.request<ItemFlingEffect>(`item-fling-effect/${nameOrId}/`);
	}

	/** Pockets within the players bag used for storing items by category. */
	getItemPocket(nameOrId: NameOrId) {
		return this.request<ItemPocket>(`item-pocket/${nameOrId}/`);
	}

	/** Locations that can be visited within the games. Locations make up sizable portions of regions, like cities or routes. */
	getLocation(nameOrId: NameOrId) {
		return this.request<Location>(`location/${nameOrId}/`);
	}

	/** Location areas are sections of areas, such as floors in a building or cave. Each area has its own set of possible Pokemon encounters. */
	getLocationArea(nameOrId: NameOrId) {
		return this.request<LocationArea>(`location-area/${nameOrId}/`);
	}

	/** Areas used for grouping Pokemon encounters in Pal Park. They're like habitats that are specific to Pal Park. */
	getPalParkArea(nameOrId: NameOrId) {
		return this.request<PalParkArea>(`pal-park-area/${nameOrId}/`);
	}

	/** A region is an organized area of the Pokemon world. Most often, the main difference between regions is the species of Pokemon that can be encountered within them. */
	getRegion(nameOrId: NameOrId) {
		return this.request<Region>(`region/${nameOrId}/`);
	}

	/** Machines are the representation of items that teach moves to Pokemon. They vary from version to version, so it is not certain that one specific TM or HM corresponds to a single Machine. */
	getMachine(id: number) {
		return this.request<Machine>(`machine/${id}/`);
	}

	/** Moves are the skills of Pokemon in battle. In battle, a Pokemon uses one move each turn. Some moves (including those learned by Hidden Machine) can be used outside of battle as well, usually for the purpose of removing obstacles or exploring new areas. */
	getMove(nameOrId: NameOrId) {
		return this.request<Move>(`move/${nameOrId}/`);
	}

	/** Move Ailments are status conditions caused by moves used during battle. See Bulbapedia for greater detail. */
	getMoveAilment(nameOrId: NameOrId) {
		return this.request<MoveAilment>(`move-ailment/${nameOrId}/`);
	}

	/** Styles of moves when used in the Battle Palace. See Bulbapedia for greater detail. */
	getMoveBattleStyle(nameOrId: NameOrId) {
		return this.request<MoveBattleStyle>(`move-battle-style/${nameOrId}/`);
	}

	/** Very general categories that loosely group move effects. */
	getMoveCategory(nameOrId: NameOrId) {
		return this.request<MoveCategory>(`move-category/${nameOrId}/`);
	}

	/** Damage classes moves can have, e.g. physical, special, or non-damaging. */
	getMoveDamageClass(nameOrId: NameOrId) {
		return this.request<MoveDamageClass>(`move-damage-class/${nameOrId}/`);
	}

	/** Methods by which Pokemon can learn moves. */
	getMoveLearnMethod(nameOrId: NameOrId) {
		return this.request<MoveLearnMethod>(`move-learn-method/${nameOrId}/`);
	}

	/** Targets moves can be directed at during battle. Targets can be Pokemon, environments or even other moves. */
	getMoveTarget(nameOrId: NameOrId) {
		return this.request<MoveTarget>(`move-target/${nameOrId}/`);
	}

	/** Abilities provide passive effects for Pokemon in battle or in the overworld. Pokemon have multiple possible abilities but can have only one ability at a time. Check out Bulbapedia for greater detail. */
	getAbility(nameOrId: NameOrId) {
		return this.request<Ability>(`ability/${nameOrId}/`);
	}

	/** Characteristics indicate which stat contains a Pokemon's highest IV. A Pokemon's Characteristic is determined by the remainder of its highest IV divided by 5 (gene_modulo). Check out Bulbapedia for greater detail. */
	getCharacteristic(id: number) {
		return this.request<Characteristic>(`characteristic/${id}/`);
	}

	/** Egg Groups are categories which determine which Pokemon are able to interbreed. Pokemon may belong to either one or two Egg Groups. Check out Bulbapedia for greater detail. */
	getEggGroup(nameOrId: NameOrId) {
		return this.request<EggGroup>(`egg-group/${nameOrId}/`);
	}

	/** Genders were introduced in Generation II for the purposes of breeding Pokemon but can also result in visual differences or even different evolutionary lines. Check out Bulbapedia for greater detail. */
	getGender(nameOrId: NameOrId) {
		return this.request<Gender>(`gender/${nameOrId}/`);
	}

	/** Growth rates are the speed with which Pokemon gain levels through experience. Check out Bulbapedia for greater detail. */
	getGrowthRate(nameOrId: NameOrId) {
		return this.request<GrowthRate>(`growth-rate/${nameOrId}/`);
	}

	/** Natures influence how a Pokemon's stats grow. See Bulbapedia for greater detail. */
	getNature(nameOrId: NameOrId) {
		return this.request<Nature>(`nature/${nameOrId}/`);
	}

	/** Pokeathlon Stats are different attributes of a Pokemon's performance in Pokeathlons. In Pokeathlons, competitions happen on different courses; one for each of the different Pokeathlon stats. See Bulbapedia for greater detail. */
	getPokeathlonStat(nameOrId: NameOrId) {
		return this.request<PokeathlonStat>(`pokeathlon-stat/${nameOrId}/`);
	}

	/** Pokemon are the creatures that inhabit the world of the Pokemon games. They can be caught using Pokeballs and trained by battling with other Pokemon. Each Pokemon belongs to a specific species but may take on a variant which makes it differ from other Pokemon of the same species, such as base stats, available abilities and typings. See Bulbapedia for greater detail. */
	getPokemon(nameOrId: NameOrId) {
		return this.request<Pokemon>(`pokemon/${nameOrId}/`);
	}

	/** Pokemon Location Areas are ares where Pokemon can be found. */
	getLocationAreaEncounter(nameOrId: NameOrId) {
		return this.request<LocationAreaEncounter>(`pokemon/${nameOrId}/encounters`);
	}

	/** Colors used for sorting Pokemon in a Pokedex. The color listed in the Pokedex is usually the color most apparent or covering each Pokemon's body. No orange category exists; Pokemon that are primarily orange are listed as red or brown. */
	getPokemonColor(nameOrId: NameOrId) {
		return this.request<PokemonColor>(`pokemon-color/${nameOrId}/`);
	}

	/** Some Pokemon may appear in one of multiple, visually different forms. These differences are purely cosmetic. For variations within a Pokemon species, which do differ in more than just visuals, the 'Pokemon' entity is used to represent such a variety. */
	getPokemonForm(nameOrId: NameOrId) {
		return this.request<PokemonForm>(`pokemon-form/${nameOrId}/`);
	}

	/** Habitats are generally different terrain Pokemon can be found in but can also be areas designated for rare or legendary Pokemon. */
	getPokemonHabitat(nameOrId: NameOrId) {
		return this.request<PokemonHabitat>(`pokemon-habitat/${nameOrId}/`);
	}

	/** Shapes used for sorting Pokemon in a Pokedex. */
	getPokemonShape(nameOrId: NameOrId) {
		return this.request<PokemonShape>(`pokemon-shape/${nameOrId}/`);
	}

	/** A Pokemon Species forms the basis for at least one Pokemon. Attributes of a Pokemon species are shared across all varieties of Pokemon within the species. A good example is Wormadam; Wormadam is the species which can be found in three different varieties, Wormadam-Trash, Wormadam-Sandy and Wormadam-Plant. */
	getPokemonSpecies(nameOrId: NameOrId) {
		return this.request<PokemonSpecies>(`pokemon-species/${nameOrId}/`);
	}

	/** Stats determine certain aspects of battles. Each Pokemon has a value for each stat which grows as they gain levels and can be altered momentarily by effects in battles. */
	getStat(nameOrId: NameOrId) {
		return this.request<Stat>(`stat/${nameOrId}/`);
	}

	/** Types are properties for Pokemon and their moves. Each type has three properties: which types of Pokemon it is super effective against, which types of Pokemon it is not very effective against, and which types of Pokemon it is completely ineffective against. */
	getType(nameOrId: NameOrId) {
		return this.request<Type>(`type/${nameOrId}/`);
	}

	/** Languages for translations of API resource information. */
	getLanguage(nameOrId: NameOrId) {
		return this.request<Language>(`language/${nameOrId}/`);
	}

	/**
	 * Prints debug stats about API calls.
	 */
	printStats() {
		console.log("    API Stats"
			+ "\n================="
			+ "\nFetch Count --- " + this.fetchCount
			+ "\nCache Hits ---- " + this.cacheHitCount
			+ "\nAPI Calls ----- " + (this.fetchCount + this.cacheHitCount)
			+ "\n================="
		);
	}
}

const api = new PokeApi();
export default api;