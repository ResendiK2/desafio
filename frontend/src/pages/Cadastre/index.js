import React, { useState } from "react";

import { Link } from 'react-router-dom'

import { API } from "../../api";

import InputMask from 'react-input-mask';

import { FcSearch } from 'react-icons/fc';

import { IoReturnUpBackOutline } from 'react-icons/io5';

import './styles.css';

function Cadastre(props) {

     const [cnpj, setCnpj] = useState("");
     const [company, setCompany] = useState();
     const [sucess, setSucess] = useState(false);

     const clean = (e) => {
          e.preventDefault();

          setCnpj("");
          setCompany("");
          setSucess(false);
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
                    setSucess(true);
               })
               .catch((apiError) => {
                    alert(apiError.response.data);
               });
     }

     return (
          <div id="cadastre">

               <div className="header">

                    <Link to="/" ><IoReturnUpBackOutline size={25} /> </Link>
                    <h1>CADASTRAR EMPRESAS</h1>

               </div>

               <form id="form">
                    <fieldset id="formContent">
                         <label>CNPJ:</label>
                         <InputMask
                              mask="99.999.999/9999-99"
                              name="cnpj"
                              type="text"
                              value={cnpj}
                              onChange={(e) => { setCnpj(e.target.value) }}
                         />
                         {!company ?
                              <button id="cadastreButton" type="submit" onClick={search}>
                                   <FcSearch size={25} />
                              </button>
                              :
                              <>
                                   <button id="cadastreButton" type="submit" onClick={search}>
                                        <FcSearch size={25} />
                                   </button>
                                   <button id="cadastreButton" type="submit" onClick={clean}>
                                        Limpar
                                   </button>

                              </>
                         }
                    </fieldset>
               </form>

               {company &&
                    <div className="table">
                         <table>
                              <tr>
                                   <th>CNPJ</th>
                                   <th>Nome</th>
                                   <th>Raz??o Social</th>
                                   <th>Endere??o</th>
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
                         <div className="footer">
                              {!sucess ?
                                   <button className="cadastreDates" type="submit" onClick={cadastre}>
                                        Cadastrar {company.name}
                                   </button>
                                   :
                                   <Link to="/" className="cadastreDates" >Voltar</Link>
                              }
                         </div>

                    </div>
               }


          </div >
     );
}

export default Cadastre;