import React, { useState, useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import Context from "../../context/Context";
import ShowUsers from "./ShowUsers";

export default function Home() {
    const socket = useContextSelector(Context, (item) => item.socket);
    const [allusers, setAllUsers] = useState(null);

    socket.on("send_users", (users) => {
        setAllUsers(users);
        console.log(`allusers: ${allusers}`);
        console.log(
            `get users: ${users.map((user) => user.id + ", " + user.username)}`
        );
    });

    return <>{allusers[0].username}</>;
}
