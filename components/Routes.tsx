import React, { lazy, Suspense, useCallback, createElement } from "react"
import { Switch, Route, RouteProps } from "react-router-dom"

export const Routes: React.FC = () => (
  <Switch>
    <RouteSuspense
      path="/org/:login/pile"
      component={import("./OrganizationPile")}
    />
    <RouteSuspense
      path="/:owner/:name/pile"
      component={import("./RepositoryPile")}
    />
    <RouteSuspense path="/:owner/:name/gantt" component={import("./Gantt")} />
    <RouteSuspense path="/:owner/:name" component={import("./Repository")} />
    <RouteSuspense path="/" component={import("./Home")} />
  </Switch>
)

const RouteSuspense: React.FC<
  Omit<RouteProps, "component"> & {
    component: Promise<{ default: React.ComponentType }>
  }
> = ({ component, exact = true, ...props }) => (
  <Route
    {...props}
    exact={exact}
    component={useCallback(
      props => (
        <Suspense fallback="Loading...">
          {createElement(
            lazy(() => component),
            props
          )}
        </Suspense>
      ),
      [component]
    )}></Route>
)
