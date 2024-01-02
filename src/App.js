
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Login from './components/Login';
import Sidebar from './components/sidebar';
import Home from './components/Home';
import Post from './components/Post';
import Accepted from './components/accepted';
import Rejected from './components/rejected';
import Donation from './components/donation';
import Terms from './components/termandcondition';
import Policy from './components/privacypolicy'
import Request from './components/request';
// const Sidebarlayout = () => {
//   <>
//     <Sidebar />
//     <Outlet />
//   </>
// }

const App = () => {


  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route element={<Sidebar />}/>
            {/* <Route index element={<Home />} /> */}

            <Route path="Home" element={<> <Sidebar /> <Home /></>} />
            <Route path="Post" element={<> <Sidebar /><Post /></>} />
            <Route path="Request" element={<> <Sidebar /><Request /> </>} />
            <Route path="Accepted" element={<> <Sidebar /><Accepted /></>} />
            <Route path="Rejected" element={<> <Sidebar /><Rejected /></>} />
            <Route path="Donation" element={<> <Sidebar /><Donation /></>} />
            <Route path="Terms" element={<> <Sidebar /><Terms /></>} />
            <Route path="Policy" element={<> <Sidebar /><Policy /></>} />
            <Route path="*" element={<Outlet />} />
          {/*   */}

        </Routes>
      </div>
    </Router>

  );
};



export default App;


