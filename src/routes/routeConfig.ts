import { Home } from '../common/Home';
import { NotFound } from '../common/NotFound';
import { ApplicantDetails } from '../components/applicantDetails/applicantDetails';
import { ApplicationForm } from '../components/applicationForm/ApplicationForm';
import { RouteConfigInterface } from './routeConfig.interface';
import { applicationPath } from './routePath';

export const routes: RouteConfigInterface[] = [
    {
        path: applicationPath.HOME,
        component: Home,
        protectedRoute: false,
    },

    {
        path: applicationPath.NOT_FOUND,
        component: NotFound,
        protectedRoute: false,
    },
    {
        path: applicationPath.REGISTER,
        component: ApplicationForm,
        protectedRoute: false,
    },
    {
        path: applicationPath.DETAILS,
        component: ApplicantDetails,
        protectedRoute: false,
    },

]