import { NamedAPIResource } from "./Utility";

export interface Machine {
	/** The identifier for this resource. */
	id: number;
	/** The TM or HM item that corresponds to this machine. */
	item: NamedAPIResource;
	/** The move that is taught by this machine. */
	move: NamedAPIResource;
	/** The version group that this machine applies to. */
	version_group: NamedAPIResource;
}

