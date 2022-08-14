import { createContext } from "use-context-selector"

const Context = {
	username: "",
	setUserName: () => {},
	room: "",
	setRoom: () => {},
	socket: null
}

export default createContext(Context)
