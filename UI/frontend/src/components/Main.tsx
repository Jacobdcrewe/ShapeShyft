import React from "react";
import ContentRouter from "./ContentRouter";

export function Main() {
    return (
        <div className="w-screen h-screen bg-stone-800 dark:bg-black p-1 md:p-2 overflow-hidden flex text-neutral-950 dark:text-neutral-100">
            <div className="flex flex-grow items-center justify-center rounded-xl bg-neutral-200 dark:bg-neutral-900 p-4">
                <ContentRouter />
            </div>
        </div>
    )
}

export default Main;