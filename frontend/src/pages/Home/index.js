import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import { API } from "../../api";

import DateTable from "../../components/DateTable/index";
//import Input from "../../components/Input/index";

import './styles.css';

function Home(props) {

     const [companies, setCompanies] = useState([]);

     useEffect(() => {
          API.get("/")
               .then((res) => {
                    setCompanies(res.data);
               })
               .catch((apiError) => {
                    console.log(apiError.response);
               });
     }, []);

     return (
          <div id="home">

               <div>
                    <h1>EMPRESAS CADASTRADAS</h1>
               </div>

               <div className="cadastre">
                    <Link to="/company" id="btn">Cadastrar nova empresa</Link>
               </div>

               <div className="table">
                    <DateTable company={companies} />
               </div>

          </div >
     );
}

export default Home;