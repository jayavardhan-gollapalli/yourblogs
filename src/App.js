import './App.css';
import { BrowserRouter as Router,Routes, Route, Link, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import YourBlog from './components/YourBlogs'
import Unpublished from './components/Unpublished'
import Login from './components/Login';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './features/userSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { logged } from './features/userSlice'; 
import Blog from './components/Blog';
import { getPublicBlogs, getUserBlogs } from './features/blogSlice';

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    console.log("Initiating getting user details and public blogs")
    dispatch( getUser() );
    dispatch( getPublicBlogs() );
    dispatch ( getUserBlogs() );
  })
  // let  loggedin = useSelector(logged);
  // console.log(loggedin);
  return (

<Router>
    <Navbar/>
  <Routes>
    
    <Route exact path='/blog/:id' element={<Blog/>}></Route>
    <Route exact path='/' element={<Home/>}></Route>
    <Route exact path='/yourBlogs' element={<YourBlog/>}></Route>
    <Route exact path='/unPublished' element={<Unpublished/>}></Route>
  </Routes>
</Router>
  );
}

export default App;
