import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom"

const App = lazy(() => import("~/components/App"))

ReactDOM.render(
  <Suspense fallback="Loading...">
    <App />
  </Suspense>,
  document.getElementById("app")
)
