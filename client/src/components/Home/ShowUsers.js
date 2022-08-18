import React, { useState, useEffect } from "react";
import Context from "../../context/Context";
import { useContextSelector } from "use-context-selector";

export default function ShowUsers() {
    const socket = useContextSelector(Context, (item) => item.socket);
    const [alluser, setAlluser] = useState([]);

    const get_data = () => {
        socket.emit("load_users");
        socket.on("send_users", (users) => {
            setAlluser(users);
        });
    };

    useEffect(() => {
        get_data();
        console.log(alluser);
    }, []);

    return <div style={{ background: "white" }}>{alluser.length}</div>;
}
