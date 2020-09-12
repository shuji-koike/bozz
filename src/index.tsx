import firebase from "firebase/app"
import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom"

export const config: Config = require("../config.json")

firebase.initializeApp(config.firebaseConfig)

const App = lazy(() => import("~/components/App"))

ReactDOM.render(
  <Suspense fallback="Loading...">
    <App />
  </Suspense>,
  document.getElementById("app")
)
