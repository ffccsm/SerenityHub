import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Appointment from '../Pages/Appointment/Appointment/Appointment';
import ContactUs from '../Pages/ContactUs/ContactUs';
import Home from '../Pages/Home/Home/Home';
import About from '../Pages/About/About';
import MeetOurTeam from '../Pages/MeetOurTeam/MeetOurTeam';
import AddictionTreatment from '../Pages/treatment/AddictionTreatment';
import DrugRehab from '../Pages/treatment/DrugRehab';
import Programmes from '../Pages/treatment/Programmes';
import Detoxification from '../Pages/treatment/Detoxification';
import Therapies from '../Pages/treatment/Therapies';
import Aftercare from '../Pages/treatment/Aftercare';
import UserLogin from '../Login/UserLogin'; // User login page
import AdminLogin from '../Login/AdminLogin'; // Admin login page
import Signup from '../Signup/Signup'; // Signup page
import PrivateRoute from '../PrivateRoute/PrivateRoute'; // Route guard for authenticated users
import AdminRoute from '../PrivateRoute/AdminRoute'; // Route guard for admins
import CustomError from '../MyComponent/CustomError'; // Custom error component
import Packages from '../Pages/treatment/Packages';
import UserDashboard from '../Pages/UserDashboard/UserDashboard'; // User dashboard page
import AdminDashboard from '../Pages/AdminDashboard/AdminDashboard'; // Admin dashboard page
import ResetPassword from '../Login/ResetPassword'; // Password reset page

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <CustomError />, // Custom error handling for undefined routes
    children: [
      { path: '/', element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/appointment', element: <Appointment /> },
      { path: '/contact', element: <ContactUs /> },
      { path: '/about', element: <About /> },
      { path: '/meet-our-team', element: <MeetOurTeam /> },
      { path: '/treatment/AddictionTreatment', element: <AddictionTreatment /> },
      { path: '/treatment/DrugRehab', element: <DrugRehab /> },
      { path: '/treatment/Programmes', element: <Programmes /> },
      { path: '/treatment/Detoxification', element: <Detoxification /> },
      { path: '/treatment/Therapies', element: <Therapies /> },
      { path: '/treatment/Aftercare', element: <Aftercare /> },
      { path: '/treatment/Packages', element: <Packages /> },
      { path: '/login/user', element: <UserLogin /> },
      { path: '/login/admin', element: <AdminLogin /> },
      { path: '/signup', element: <Signup /> },
      { path: '/reset-password', element: <ResetPassword /> }, // Password reset route
      {
        path: '/user/dashboard',
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/admin/dashboard',
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
    ],
  },
]);
