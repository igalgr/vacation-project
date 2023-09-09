// import React from 'react';
// import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
// import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
// import Home from './pages/Home/Home';
// import NavBar from './components/NavBar/NavBar';
// import VacationForm from './components/VacationForm/VacationForm';
// import { useSelector } from 'react-redux';
// import { RootState } from './redux/Store';
// import FollowersGraph from './components/FollowersChart/FollowersChart';
// import Page404 from './pages/Page404/Page404';

// const Layout = () => {
//   const location = useLocation();
//   const hideNavBar = ["/", "/register"].includes(location.pathname);
//   const token = useSelector((state: RootState) => state.auth.token);
//   const isAdmin = useSelector((state: RootState) => state.auth.user?.level);
//   return (
//     <div className='app'>
//       <div className='navbar'>
//         <header>{ !hideNavBar && <NavBar /> }</header>
//       </div>
//       <div className='main'>
//         <main>
//         <Routes>
//             <Route
//               path="/"
//               element={token ? <Navigate to="/home" /> : <Login />}
//             />
//             <Route
//               path="/register"
//               element={token ? <Navigate to="/home" /> : <Register />}
//             />
//             <Route
//               path="/home"
//               element={token ? <Home /> : <Navigate to="/" />}
//             />
//             <Route
//               path="/addVacation"
//               element={
//                 isAdmin === 1 ? <VacationForm /> : <Navigate to="/home" />
//               }
//             />
//             <Route
//               path="/editVacation/:id"
//               element={
//                 isAdmin === 1 ? <VacationForm /> : <Navigate to="/home" />
//               }
//             />
//             <Route
//               path="/followersChart"
//               element={
//                 isAdmin === 1 ? <FollowersGraph /> : <Navigate to="/home" />
//               }
//             />
//             <Route
//               path="*"
//               element={token ? <Page404 /> : <Navigate to="/" />}
//             />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   )
// }

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Layout/>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import VacationForm from './components/VacationForm/VacationForm';
import { useSelector } from 'react-redux';
import { RootState } from './redux/Store';
import FollowersGraph from './components/FollowersChart/FollowersChart';
import Page404 from './pages/Page404/Page404';
import DeleteConfirmationModal from './pages/DeleteConfirmationModal/DeleteConfirmationModal';

const Layout = () => {
  const location = useLocation();
  const hideNavBar = ["/", "/register"].includes(location.pathname);
  const token = useSelector((state: RootState) => state.auth.token);
  const isAdmin = useSelector((state: RootState) => state.auth.user?.level);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vacationToDelete, setVacationToDelete] = useState(null);
  const [isEditToAddTransition, setIsEditToAddTransition] = useState(false);
  const [isEditPage, setIsEditPage] = useState(false);

  const handleDeleteVacation = (vacationId: React.SetStateAction<null>) => {
    setVacationToDelete(vacationId);

    // Determine if transitioning from "editVacation" to "addVacation"
    if (location.pathname.startsWith("/editVacation")) {
      setIsEditToAddTransition(true);
    } else {
      setIsEditToAddTransition(false);
    }

    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setVacationToDelete(null);
  };

  const handleConfirmDelete = () => {
    // Implement the delete logic here
    // For this example, you can simply log the ID of the vacation to delete
    console.log("Deleting vacation with ID:", vacationToDelete);
    setShowDeleteModal(false);
    setVacationToDelete(null);
  };

  // useEffect to update the isEditPage state when the location changes
  useEffect(() => {
    setIsEditPage(location.pathname.startsWith("/editVacation"));
  }, [location.pathname]);

  return (
    <div className='app'>
      <div className='navbar'>
        <header>{!hideNavBar && <NavBar />}</header>
      </div>
      <div className='main'>
        <main>
          <Routes>
            <Route
              path="/"
              element={token ? <Navigate to="/home" /> : <Login />}
            />
            <Route
              path="/register"
              element={token ? <Navigate to="/home" /> : <Register />}
            />
            <Route
              path="/home"
              element={token ? <Home /> : <Navigate to="/" />}
            />

            {/* Conditionally render the "addVacation" route */}
            {isEditPage ? null : (
              <Route
                path="/addVacation"
                element={isAdmin === 1 ? <VacationForm /> : <Navigate to="/home" />}
              />
            )}

            <Route
              path="/editVacation/:id"
              element={isAdmin === 1 ? <VacationForm /> : <Navigate to="/home" />}
            />
            <Route
              path="/followersChart"
              element={isAdmin === 1 ? <FollowersGraph /> : <Navigate to="/home" />}
            />
            <Route
              path="*"
              element={token ? <Page404 /> : <Navigate to="/" />}
            />
          </Routes>

          {/* Render the DeleteConfirmationModal */}
          <DeleteConfirmationModal
            isOpen={showDeleteModal}
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
