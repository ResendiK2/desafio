import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom'

import { API } from "../../api";

import InputMask from 'react-input-mask';

import { FcSearch } from 'react-icons/fc';

import styles from './styles.css';

function Home(props) {

     const [cnpj, setCnpj] = useState("");
     const [company, setCompany] = useState();
     const [cnpjClean, setCnpjClean] = useState("");

     const search = () => {
          console.log(cnpj);

          /*           setCnpjClean(cnpj);
                    cnpjClean.replace('.', '');
                    cnpjClean.replace('/', '');
                    cnpjClean.replace('-', '');
                    console.log("clean:" + cnpjClean); */

     }

     /*      function search() {
               console.log("chamou")
               API.post('/company')
                    .then((res) => {
                         setCompany(res);
                         console.log(res.data);
                    })
                    .catch((apiError) => {
                         console.log(apiError.response);
                    });
          } */

     return (
          <div id="cadastre">

               <h1>CADASTRAR EMPRESAS</h1>
               <form id="form" onSubmit={search}>
                    <fieldset id="formContent">
                         <label>CNPJ:</label>
                         <InputMask
                              mask="99.999.999/9999-99"
                              name="cnpj"
                              type="text"
                              value={cnpj}
                              onChange={(e) => { setCnpj(e.target.value) }}
                         />

                         <button id="cadastreButton" type="submit">
                              Fazer Cadastro
                         </button>
                    </fieldset>
               </form>


               <Link to="/" >Voltar</Link>

          </div >
     );
}

export default Home;