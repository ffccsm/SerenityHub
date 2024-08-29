import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Appointment from "../Pages/Appointment/Appointment/Appointment";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import MeetOurTeam from '../Pages/MeetOurTeam/MeetOurTeam';
import AddictionTreatment from '../Pages/treatment/AddictionTreatment';
import DrugRehab from '../Pages/treatment/DrugRehab';
import Programmes from '../Pages/treatment/Programmes';
import Detoxification from '../Pages/treatment/Detoxification';
import Therapies from '../Pages/treatment/Therapies';
import Aftercare from '../Pages/treatment/Aftercare';
import AppointmentsList from '../Pages/AppointmentsList'; // Import the new component

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/appointment',
        element: <Appointment /> 
      },
      {
        path: '/contact',
        element: <ContactUs />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/meet-our-team',
        element: <MeetOurTeam />
      },
      {
        path: '/treatment/AddictionTreatment',
        element: <AddictionTreatment />
      },
      {
        path: '/treatment/DrugRehab',
        element: <DrugRehab />
      },
      {
        path: '/treatment/Programmes',
        element: <Programmes />
      },
      {
        path: '/treatment/Detoxification',
        element: <Detoxification />
      },
      {
        path: '/treatment/Therapies',
        element: <Therapies />
      },
      {
        path: '/treatment/Aftercare',
        element: <Aftercare />
      },
      {
        path: '/appointments-list', // New route for AppointmentsList
        element: <AppointmentsList />
      }
    ]
  }
]);
