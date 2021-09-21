import React, { useState } from "react";

import { Link } from 'react-router-dom'

import { API } from "../../api";

import InputMask from 'react-input-mask';

import { FcSearch } from 'react-icons/fc';

import './styles.css';

function Cadastre(props) {

     const [cnpj, setCnpj] = useState("");
     const [company, setCompany] = useState();
     const [sucess, setSucess] = useState(false);
     //const [cnpjClean, setCnpjClean] = useState("");

     const clean = (e) => {
          e.preventDefault();

          setCnpj("");
          setCompany("");
     }

     const search = (e) => {
          e.preventDefault();

          API.post("/search", {
               cnpj
          })
               .then((res) => {
                    setCompany(res.data);
               })
               .catch((apiError) => {
                    alert(apiError.response.data);
               });
     }

     const cadastre = (e) => {
          e.preventDefault();

          const {
               cnpj,
               name,
               corporateName,
               address,
               primaryActivity
          } = company;

          API.post("/company", {
               cnpj,
               name,
               corporateName,
               address,
               primaryActivity
          })
               .then((res) => {
                    console.log("boa")
                    setSucess(true);
               })
               .catch((apiError) => {
                    alert(apiError.response.data);
               });
     }

     return (
          <div id="cadastre">

               <h1>CADASTRAR EMPRESAS</h1>
               <form id="form">
                    <fieldset id="formContent">
                         <label>CNPJ:</label>
                         <input
                              name="cnpj"
                              type="text"
                              value={cnpj}
                              onChange={(e) => { setCnpj(e.target.value) }}
                              maxLength={14}
                         />
                         {/* <InputMask
                              mask="99.999.999/9999-99"
                              name="cnpj"
                              type="text"
                              value={cnpj}
                              onChange={(e) => { setCnpj(e.target.value) }}
                         /> */}
                         {!company ?
                              <button id="cadastreButton" type="submit" onClick={search}>
                                   <FcSearch size={25} />
                              </button>
                              :
                              <button id="cadastreButton" type="submit" onClick={clean}>
                                   Limpar
                              </button>
                         }
                    </fieldset>
               </form>

               {company &&
                    <div className="table">
                         <table>
                              <tr>
                                   <th>CNPJ</th>
                                   <th>Nome</th>
                                   <th>Razão Social</th>
                                   <th>Endereço</th>
                                   <th>Atividade Primaria</th>
                              </tr>
                              <tr>
                                   <td>{company.cnpj}</td>
                                   <td>{company.name}</td>
                                   <td>{company.corporateName}</td>
                                   <td>{company.address}</td>
                                   <td>{company.primaryActivity}</td>
                              </tr>
                         </table>

                         {!sucess ?
                              <button className="cadastre" type="submit" onClick={cadastre}>
                                   Cadastrar {company.name}
                              </button>
                              :
                              <Link to="/" >Voltar</Link>
                         }

                    </div>
               }


          </div >
     );
}

export default Cadastre;