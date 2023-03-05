import React from "react";
import Listuser from "./List";
import Register from "./Register";
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';


function App() {
  const  userId  = useParams()
  return (
 
    <Router>
      <Routes>
        <Route path="/" element={<Listuser/>} />
        <Route path="/register/:id" element={<Register/>} />
      </Routes>
    </Router>

  );
}

export default App;
