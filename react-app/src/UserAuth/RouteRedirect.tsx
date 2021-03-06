/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'

export type RouteRedirectProps = {
  /** Path of route */
  path: string
  /** Component to render if no redirect */
  component: React.FC
  /** Redirection destionation */
  to: string
  /** Whether to redirect instead of rendering component */
  redirect?: boolean
}

/**
 * For a path that user visites, the component will either render component
 * or redirects user depends on given condition
 */
export const RouteRedirect = ({
  path,
  to = '/dashboard',
  component: C,
  redirect,
}: RouteRedirectProps) => {
  const location = useLocation()
  const getComponent = () => {
    if (redirect) {
      return (
        <Redirect
          exact
          path={path}
          to={{ pathname: to, state: { from: location } }}
        />
      )
    }
    return <C />
  }
  return <Route path={path} render={getComponent} />
}

export type AuthRoutingProps = {
  loggedIn?: boolean
} & Omit<RouteRedirectProps, 'redirectCondition'>

/**
 * Route for auth pages
 */
export const AuthPageRoute = ({ loggedIn, ...rest }: AuthRoutingProps) => {
  return <RouteRedirect redirect={loggedIn} {...rest} />
}

/**
 * Route for protected paths
 */
export const ProtectedRoute = ({ loggedIn, ...rest }: AuthRoutingProps) => {
  return <RouteRedirect redirect={!loggedIn} {...rest} />
}
