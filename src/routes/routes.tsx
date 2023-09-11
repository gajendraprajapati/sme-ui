import React from 'react'
import { routes } from './routeConfig';
import { RouteConfigInterface } from './routeConfig.interface';
import { Routes, Route, BrowserRouter } from "react-router-dom";

export const CustomRoutes = () => {
    const renderRoutes = (routes: RouteConfigInterface[]) => {
        let routeList: any[] = [];
        routes.forEach(({ path, component: Component }) => {
            routeList.push(
                <Route
                    key={path}
                    path={path}
                    element={
                        <Component />
                    }
                >
                </Route>
            )
        })
        return routeList;
    }

    return (
        <Routes>
            {renderRoutes(routes)}
        </Routes>
    );
}
