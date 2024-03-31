import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import {Provider} from 'react-redux';
import store from './store/Store'
import Auth from './pages/Auth';
import Order from './pages/Order'

function App() {

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/myOrder' element={<Order />}></Route>
        </Routes>
      </BrowserRouter>   
    </Provider>
    </>
  )
}

export default App