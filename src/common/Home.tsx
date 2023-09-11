import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Loader } from './Loader';
import { applicationPath } from '../routes/routePath';

export const Home = () => {
    Navigate({ to: applicationPath.REGISTER });
    return <div></div>
}
