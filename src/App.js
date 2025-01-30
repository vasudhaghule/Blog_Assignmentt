
import './App.css';
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditAddBlog from "./pages/EditAddBlog";
import Blog from "./pages/Sblog";
import About from "./pages/About";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Sblog from './pages/Sblog';

function App() {
  return (
    
      <BrowserRouter>
       <div className="App">
        <Header/>
        <ToastContainer/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addBlog" element={<EditAddBlog />} />
          <Route exact path="/editBlog/:id" element={<EditAddBlog />} />
         
          <Route exact path="/blog/:id" element={<Sblog />} />
          <Route exact path="/*" element={<NotFound />} />
        </Routes>
        </div>
      </BrowserRouter>
   
  );
}

export default App;
