import { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { SearchFuseContext, PokemonAsset, usePokemonMovesContext, usePokemonNamesContext } from "../contexts/DataListsContext";
import { cleanStringToData } from '../utility/StringCleaning';

const MAX_SEARCH_RESULTS = 10;
type searchTermIndexCallback = (index: number) => void;

// FIXME : Could possibly switch to use reducer
export function SearchBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const textInputRef = useRef(null);
    const searchTermsRef = useRef(null);
    const [searchBoxFocused, setSearchBoxFocused] = useState(false);
    const [searchResults, setSearchResults] = useState<Fuse.FuseResult<PokemonAsset>[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const fuse = useContext(SearchFuseContext);
    const [pokemonNames] = usePokemonNamesContext();
    const [pokemonMoves] = usePokemonMovesContext();

    function adjustSelectedIndex(shift: number) {
        let newIndex = selectedIndex + shift;
        if (newIndex < 0) newIndex = searchResults.length - 1;
        else if (newIndex >= searchResults.length) newIndex = 0;
        setSelectedIndex(newIndex);
    }

    function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
        const key = e.key;
        switch (key) {
            case "Enter":
                setSelectedIndex(-1);
                submitSearch();
                break;
            case "ArrowUp":
                e.preventDefault();
                adjustSelectedIndex(-1);
                break;
            case "ArrowDown":
                e.preventDefault();
                adjustSelectedIndex(1);
                break;
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const nextSearchTerm = e.target.value;
        const nextResults = fuse.search(nextSearchTerm).filter((_, index) => index < MAX_SEARCH_RESULTS);
        setSelectedIndex(-1);
        setSearchTerm(nextSearchTerm);
        setSearchResults(nextResults);
        adjustDropdownVisibility(searchBoxFocused, nextResults);
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
        const nextFocused = e.target === document.activeElement;
        setSearchBoxFocused(nextFocused);
        adjustDropdownVisibility(nextFocused, searchResults);
    }

    function adjustDropdownVisibility(nextFocus: boolean, nextSearchResults: Fuse.FuseResult<PokemonAsset>[]) {
        if (searchTermsRef.current === null) return;
        const searchTermsDiv = searchTermsRef.current as HTMLDivElement;
        let show = true;
        if (!nextFocus) show = false;
        if (nextSearchResults.length < 1) show = false;
        searchTermsDiv.style.display = show ? "block" : "none";
    }

    function handleMouseOver(index: number): void {
        setSelectedIndex(index);
    }

    function submitSearch(nextSearchTerm = searchTerm) {
        nextSearchTerm = nextSearchTerm.trim();
        if (nextSearchTerm === null || nextSearchTerm === "") return;
        if (selectedIndex > -1) {
            nextSearchTerm = searchResults[selectedIndex].item.name;
            setSearchTerm(nextSearchTerm);
        }
        if (textInputRef.current != null) {
            const textInput = textInputRef.current as HTMLDivElement;
            textInput.blur();
        }
        const cleanSearchTerm = cleanStringToData(nextSearchTerm);
        let searchPrefix = "unknown";
        if (pokemonNames?.includes(cleanSearchTerm)) searchPrefix = "pokemon";
        else if (pokemonMoves?.includes(cleanSearchTerm)) searchPrefix = "move";
        console.log(nextSearchTerm);
        console.log(cleanSearchTerm);
        navigate("/" + searchPrefix + "/" + cleanSearchTerm + location.search);
        setSearchTerm("");
        setSelectedIndex(-1);
        setSearchResults([]);
    }

    function handleSearchTermClick() {
        submitSearch();
    }

    const resultElements = searchResults.map((value, index) => {
        return <SearchElement
            key={value.item.name + value.item.type}
            asset={value.item}
            index={index}
            selectedIndex={selectedIndex}
            onMouseOver={handleMouseOver}
            onClick={handleSearchTermClick}
        />;
    });

    return (
        <>
            <span className="relative ml-2">

                <input type="text" ref={textInputRef}
                    className="border border-black rounded focus:outline-none relative px-1"
                    value={searchTerm}
                    placeholder="Search..."
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleFocus}
                    onKeyDown={handleKey}
                />

                <button
                    className="border border-green-600 rounded bg-green-300 hover:bg-green-400 px-4 ml-2"
                    onClick={() => submitSearch()}
                >
                    Search
                </button>
                <div ref={searchTermsRef}
                    className="border border-black w-fit min-w-full p-1 rounded-sm absolute mt-[1px] bg-white hidden"
                >
                    {resultElements}
                </div>
            </span>
        </>
    );
}

interface SearchElementParams {
    asset: PokemonAsset;
    index: number;
    selectedIndex: number,
    onMouseOver: searchTermIndexCallback,
    onClick: searchTermIndexCallback,
}

function SearchElement({ asset, index, selectedIndex, onMouseOver, onClick }: SearchElementParams) {
    let className = "cursor-pointer flex justify-between";
    const selectedClassName = "text-red-500";
    if (index === selectedIndex) className += " " + selectedClassName;
    return (
        <div className={className} onMouseOver={() => onMouseOver(index)} onMouseDown={() => onClick(index)}>
            <span>{asset.name}</span>
            <span className=" text-xs text-gray-500">{asset.type}</span>
        </div>
    );
}