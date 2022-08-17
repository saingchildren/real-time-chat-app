import React, { useState, useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import Context from "../../context/Context";
import ShowUsers from "./ShowUsers";

export default function Home() {
    const socket = useContextSelector(Context, (item) => item.socket);
    const [allusers, setAllusers] = useState("");

    useEffect(() => {
        socket.on("send_users", (users) => {
            console.log(users);
        });

        return () => {
            socket.off("send_users");
        };
    }, []);

    return (
        <>
            <button
                onClick={() => {
                    console.log(allusers);
                }}
            >
                show
            </button>
        </>
    );
}
