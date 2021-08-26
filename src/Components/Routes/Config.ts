
import Home from "../Presentational/Home/Home.component";
import UserRegistration from '../Presentational/Registration/Registration.component';
import Feedback from '../Presentational/Feedback/Feedback.component';
import Survey from '../Presentational/Survey/Survey.component';

const routesConfig: Array<any> = [
    {
        path: '/home',
        component: Home,
        icon: 'home',
        displayText: 'Home',
    },
    {
        path: '/reg',
        component: UserRegistration,
        icon: 'home',
        displayText: 'User Registration',
    },
    {
        path: '/feedback',
        component: Feedback,
        icon: 'home',
        displayText: 'सुझाव दीजिये',
    },
    // {
    //     path: '/survey',
    //     component: Survey,
    //     icon: 'home',
    //     displayText: 'Survey',
    // }
]

export default routesConfig;
