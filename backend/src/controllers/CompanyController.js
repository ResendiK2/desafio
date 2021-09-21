const axios = require('axios');

const Company = require('../models/Company');

module.exports = {

     async index(req, res) {
          const companies = await Company.find();

          res.json(companies);
     },

     async store(req, res) {
          try {
               const {
                    cnpj,
                    name,
                    corporateName,
                    address,
                    primaryActivity
               } = req.body;

               let company = await Company.findOne({ cnpj });

               console.log("company: " + company);
               if (!company) {

                    company = await Company.create({
                         cnpj,
                         name,
                         corporateName,
                         address,
                         primaryActivity
                    });

                    return res.status(200).json(company);
               }

               res.status(400).send("Empresa já cadatrada");
          }
          catch (err) {
               res.status(400).send("Erro no servidor!");
          }
     },

     async search(req, res) {
          try {
               const { cnpj } = req.body;

               const apiResponde = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)

               if (apiResponde.data.status == "OK") {

                    let {
                         atividade_principal,
                         fantasia,
                         nome,
                         logradouro,
                         numero,
                         municipio,
                         cep
                    } = apiResponde.data;

                    const address = `${logradouro}, ${numero}, ${municipio}, ${cep}`

                    if (!fantasia) {
                         fantasia = nome;
                    }

                    const company = {
                         cnpj,
                         name: fantasia,
                         corporateName: nome,
                         address,
                         primaryActivity: atividade_principal[0].text
                    };

                    res.status(200).json(company);
               } else {
                    res.status(400).send(apiResponde.data.message);
               }
          }
          catch (err) {
               console.log(err.message);
               res.status(400).send("Erro no servidor, aguarde alguns minutos!");
          }
     }

}