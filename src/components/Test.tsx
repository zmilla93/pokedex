import { useEffect, useState } from "react";

export function Test() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(count);
        setCount(13);
    }, [count]);

    return (
        <div>
            Testing!
        </div>
    );
}