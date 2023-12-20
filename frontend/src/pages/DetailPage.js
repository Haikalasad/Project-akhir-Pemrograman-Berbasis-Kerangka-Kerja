// DetailPage.js
import React from "react";
import NavbarComponent from "../components/Navbar";
import DetailKost from "../components/DetailKost";
import { useParams } from 'react-router-dom';
import Footer from "../components/footer";

const DetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <NavbarComponent />
      <div className="content">
        <DetailKost id={id} />
      </div>
      <Footer/>
    </div>
  );
};

export default DetailPage;