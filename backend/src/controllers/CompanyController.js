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

               let cnpjClean = cnpj;
               cnpjClean = cnpjClean.replace(".", "");
               cnpjClean = cnpjClean.replace(".", "");
               cnpjClean = cnpjClean.replace("/", "");
               cnpjClean = cnpjClean.replace("-", "")

               const apiResponse = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpjClean}`)

               if (apiResponse.data.status == "OK") {

                    let {
                         atividade_principal,
                         fantasia,
                         nome,
                         logradouro,
                         numero,
                         municipio,
                         cep
                    } = apiResponse.data;

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
                    res.status(400).send(apiResponse.data.message);
               }
          }
          catch (err) {
               res.status(400).send("Erro no servidor, aguarde alguns minutos!");
          }
     }

}