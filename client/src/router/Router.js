import React from "react"
import CreatePage from "./CreatePage/CreatePage"
import { HashRouter, Routes, Route } from "react-router-dom"

export default function Router () {
	return (
		<HashRouter>
			<Routes>
				<Route exact path="" element={<CreatePage />} />
			</Routes>
		</HashRouter>
	)
}
