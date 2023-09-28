import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pokemonNames } from '../utility/data';
import Fuse from "fuse.js";

const fuseOptions = {
    isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.0,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
};
const fuse = new Fuse(pokemonNames, fuseOptions);
const MAX_SEARCH_RESULTS = 10;

type searchTermIndexCallback = (index: number) => void;

// FIXME : Pokemon names should be formatted for display in search results
export function SearchBar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const textInputRef = useRef(null);
    const searchTermsRef = useRef(null);
    const [searchBoxFocused, setSearchBoxFocused] = useState(false);
    const [searchResults, setSearchResults] = useState<Fuse.FuseResult<string>[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

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

    function adjustDropdownVisibility(nextFocus: boolean, nextSearchResults: Fuse.FuseResult<string>[]) {
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
        if (selectedIndex > -1) {
            nextSearchTerm = searchResults[selectedIndex].item;
            setSearchTerm(nextSearchTerm);
        }
        if (textInputRef.current != null) {
            const textInput = textInputRef.current as HTMLDivElement;
            textInput.blur();
        }
        navigate("/pokemon/" + nextSearchTerm);
        setSearchTerm("");
    }

    function handleSearchTermClick() {
        submitSearch();
    }

    const resultElements = searchResults.map((value, index) => {
        return <SearchElement
            key={value.item}
            value={value.item}
            index={index}
            selectedIndex={selectedIndex}
            onMouseOver={handleMouseOver}
            onClick={handleSearchTermClick}
        />;
    });

    return (
        <>
            <span className="relative">

                <input type="text" ref={textInputRef}
                    className="border border-black rounded focus:outline-none relative"
                    value={searchTerm}
                    placeholder="Search..."
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleFocus}
                    onKeyDown={handleKey}
                />

                <button className="border border-green-600 rounded bg-green-300 hover:bg-green-400 px-4 ml-1" onClick={() => submitSearch()}>Search</button>
                <div ref={searchTermsRef} className="border border-black w-fit min-w-full p-1 rounded-sm absolute mt-[1px] bg-white hidden">
                    {resultElements}
                </div>
            </span>
            <input type="text"></input>
        </>
    );
}

interface SearchElementParams {
    value: string;
    index: number;
    selectedIndex: number,
    onMouseOver: searchTermIndexCallback,
    onClick: searchTermIndexCallback,
}

function SearchElement({ value, index, selectedIndex, onMouseOver, onClick }: SearchElementParams) {
    let className = "cursor-pointer";
    const selectedClassName = "text-red-500";
    if (index === selectedIndex) className += " " + selectedClassName;
    return (
        <div className={className} onMouseOver={() => onMouseOver(index)} onMouseDown={() => onClick(index)}>
            {value}
        </div>
    );
}