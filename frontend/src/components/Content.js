import React from 'react'
import { Route, Routes, Redirect, Switch } from 'react-router-dom'
//import { CContainer, CSpinner } from '@coreui/react'
import routes from '../routes'
import PrivateRoute from '../routing/AuthRouter/PrivateRoute'

const Content = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <Switch>
            {routes.map((route, idx) => {
                if (route.name !== "Dashboard" && route.name !== "Product" && route.name !== "Company")
                    return (
                        route.component && (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={(props) => (
                                    <>
                                        <route.component {...props} />
                                    </>
                                )}
                            />
                        )
                    )
                else
                    return (
                        <PrivateRoute exact path={route.path} component={route.component} key={idx} />
                    )
            })}
        </Switch>
    )
}

export default React.memo(Content)