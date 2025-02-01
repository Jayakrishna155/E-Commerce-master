import './App.css';
import Navbar from './Components/Navbar/navbar'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from '../src/Pages/Shop'
import Shopcategory from './Pages/shopcategory'
import Product from './Pages/product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import mens_banner from './Components/Assets/Frontend_Assets/banner_mens.png'
import womens_banner from './Components/Assets/Frontend_Assets/banner_women.png'
import kids_banner from './Components/Assets/Frontend_Assets/banner_kids.png'
function App() {
  return (
     <div>
      <BrowserRouter>
         <Navbar/>
         <Routes>
            <Route path='/' element={<Shop/>} />
            <Route path='mens' element={<Shopcategory banner={mens_banner} category="men"/>} />
            <Route path='/womens' element={<Shopcategory banner={womens_banner} category="women"/>} />
            <Route path='/kids' element={<Shopcategory banner={kids_banner}  category="kid"/>} />
            <Route path='/product' element={<Product/>}>
                 <Route path=':productId' element={<Product/>}/>
            </Route>
            <Route path='/cart' element={<Cart/>} />
            <Route path='/login' element={<LoginSignup/>}/>
         </Routes>
         <Footer/>
      </BrowserRouter>
     </div>    
  );
}

export default App;
