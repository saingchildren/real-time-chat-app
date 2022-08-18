import React, { useState, useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import Context from "../../context/Context";
import ShowUsers from "./ShowUsers";

export default function Home() {

    return (
        <>
			<ShowUsers />
		</>
    );
}
