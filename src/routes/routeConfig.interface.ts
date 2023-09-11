import * as React from 'react';

export interface RouteConfigInterface {
    path: string;
    component: React.ComponentType<any>;
    protectedRoute: boolean;
    exact?: boolean;
}
