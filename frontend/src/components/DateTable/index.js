import React from "react";

import styles from './styles.css';

function DateTable(props) {

     return (

          <div className={styles.dateTable}>
               <table>
                    <tr>
                         <th>CNPJ</th>
                         <th>Nome</th>
                         <th>Razão Social</th>
                         <th>Endereço</th>
                         <th>Atividade Primaria</th>
                    </tr>

                    {props.company.map(function (object, key) {
                         return (
                              <tr>
                                   <td>{object.cnpj}</td>
                                   <td>{object.name}</td>
                                   <td>{object.corporateName}</td>
                                   <td>{object.address}</td>
                                   <td>{object.primaryActivity}</td>
                              </tr>
                         );
                    })}


               </table>
          </div >
     );
}

export default DateTable;