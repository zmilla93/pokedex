import { ChangeEvent, EventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const textInputRef = useRef(null);
    const searchTermsRef = useRef(null);

    function handleClick() {
        // alert("!");
        navigate("/pokemon/paras");
    }

    function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
        console.log(e.key);
        if (e.key === "Enter") {
            // TODO

        }
    }

    function handleInput(e: React.FormEvent) {
        // console.log();
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) { setSearchTerm(e.target.value); }

    function handleFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
        const focused = e.target === document.activeElement;
        if (searchTermsRef.current === null) return;
        const searchTermsDiv = searchTermsRef.current as HTMLDivElement;
        searchTermsDiv.style.display = focused ? "block" : "none";
    }

    return (
        <>

            <span className="relative">
                <input type="text" ref={textInputRef} value={searchTerm} placeholder="Search..." onChange={handleChange} onFocus={handleFocus} onBlur={handleFocus} className="border border-black rounded focus:outline-none relative"></input>
                <button className="border border-green-600 rounded bg-green-300 hover:bg-green-400 px-4 ml-1">Search</button>

                {/* <div className="border-t opacity-0"> */}
                <div ref={searchTermsRef} className="border border-black w-fit p-1 rounded-sm absolute mt-[1px] bg-white hidden">
                    <SearchElement text="Charmander" />
                    <SearchElement text="Oddish" />
                    <SearchElement text="Zapdos" />
                </div>
                {/* </div> */}
            </span>


            {/* <br></br>
            <h1>V2</h1>
            <input list="searchOptions" className="border border-black rounded" placeholder="Search..." onFocus={handleFocus} onChange={handleChange} onInput={handleInput} onKeyDown={handleKey} value={searchTerm} />
            <datalist id="searchOptions">
                <option value="pk1" />
                <option value="pk2" />
                <option value="pk3" />
            </datalist>
            <button onClick={handleClick}>Click Me!</button> */}
        </>
    );
}

function SearchElement({ text, onClick }: { text: string, onClick?: Event }) {
    return (
        <div className="hover:text-red-400 cursor-pointer">
            {text}
        </div>
    );
}