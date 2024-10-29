import { Outlet } from "react-router-dom";
import Footer from '../../components/shared/footer';
import Header from '../../components/shared/header';
import React from "react";

const Layout = () => {

  return (
    <>
      <Header/> 
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout;