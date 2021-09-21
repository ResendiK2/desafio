
import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import home from "./pages/Home";
import cadastre from "./pages/Cadastre";

function Routes() {
     return (
          <BrowserRouter>
               <Route path="/" exact component={home} />
               <Route path="/company" component={cadastre} />
          </BrowserRouter>
     );
}

export default Routes;