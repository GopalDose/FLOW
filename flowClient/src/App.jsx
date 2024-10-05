// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Login from "./pages/Login/Login";
// import Registration from "./pages/Registration/Registration";
// import CompleteProfile from "./pages/CompleteProfile/CompleteProfile";
// import Profile from "./pages/Profile/Profile";
// import PersonalTask from "./pages/PersonalTask/PersonalTask";
// import AddPersonalTask from "./pages/AddPersonalTask/AddPersonalTask";
 
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Login/>}>
//       <Route path="/registration" component={Registration} />
//         <Route path="/complete-profile" component={CompleteProfile} />
//         <Route path="/profile" component={Profile} />
//         <Route path="/personal-task" component={PersonalTask} />
//         <Route path="/add-personal-task" component={AddPersonalTask} />
//     </Route>
//   )
// )

// const App = () => {
//   return (
//     <>
//     <RouterProvider router={router} />
//     </>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import CompleteProfile from "./pages/CompleteProfile/CompleteProfile";
import Profile from "./pages/Profile/Profile";
import PersonalTask from "./pages/PersonalTask/PersonalTask";
import './App.css'
import ViewPersonal from "./pages/ViewPersonal/ViewPersonal";
import TeamTask from "./pages/TeamTask/TeamTask";
import ViewTeam from "./pages/ViewTeam/ViewTeam";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/personal-task" element={<PersonalTask />} />
        <Route path="/team-task" element={<TeamTask />} />
        <Route path="/ViewPersonal/:taskId" element={<ViewPersonal />} />
        <Route path="/ViewTeam/:taskId" element={<ViewTeam />} />
      </Routes>
    </Router>
  );
};

export default App;
