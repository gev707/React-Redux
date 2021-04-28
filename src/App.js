import React, { useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
//pages
import ToDo from './Components/pages/Todo/ToDo';
import About from './Components/pages/About/About';
import ContactForm from './Components/pages/Contact/Contacts/ContactForm';
import ContactWithHook from './Components/pages/Contact/Contacts/ContactWithHook';
import ContactWithReducer from './Components/pages/Contact/Contacts/ContactWithReducer'
import ContactPage from './Components/pages/Contact/ContactPage'
import Contact from './Components/pages/Contact/Contact'
import NotFound from './Components/pages/NotFound/NotFound';
import SingleCard from './Components/pages/SingleCard/SingleCard'

import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { toggleOpenNavbar } from './Redux/simpleAction'
const router = [
  {
    component: Contact,
    path: '/contact',
    exact: true
  },
  {
    component: ToDo,
    path: '/',
    exact: true
  },
  {
    component: About,
    path: '/about',
    exact: true
  },

  {
    component: ContactWithHook,
    path: '/contactformhook',
    exact: true
  },
  {
    component: ContactPage,
    path: '/contactpage',
    exact: true
  },
  {
    component: ContactForm,
    path: '/contactformclass',
    exact: true
  },

  {
    component: NotFound,
    path: '/404',
    exact: true
  },

  {
    component: SingleCard,
    path: '/card/:id',
    exact: true
  },
  {
    component: ContactWithReducer,
    path: '/contact-reducer',
    exact: true
  },
];
const App = (props) => {
  const { error, success, isOpen } = props;
  useEffect(() => {
    error && toast.error(`${error}`, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }, [error]);
  useEffect(() => {
    success && toast.success(`${success}`, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }, [success])

  const rout = router.map((item, index) => {
    return (
      <Route
        key={index}
        path={item.path}
        component={item.component}
        exact={item.exact}
      />
    )
  })
  return (
    <div className={isOpen ? 'App vh' : 'App'}>
      <div onClick={props.toggleOpenNavbar} className='openNav'>
        <span className={!isOpen ? 'toggleSpan' : 'activeSpan'}></span>
      </div>
      {
        isOpen && <Navbar
          toggleNavbar={props.toggleOpenNavbar}
        />
      }
      <Switch>
        {rout}
        <Redirect to='/404' ></Redirect>
      </Switch>
      <div>
        <ToastContainer />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    error: state.globalState.error,
    success: state.globalState.success,
    isOpen: state.globalState.isOpen
  }
}
const mapDispatchToProps = {
  toggleOpenNavbar
}
export default connect(mapStateToProps, mapDispatchToProps)(App);