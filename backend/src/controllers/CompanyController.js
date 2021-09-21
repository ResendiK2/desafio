const axios = require('axios');

const Company = require('../models/Company');

module.exports = {

     async index(req, res) {
          const companies = await Company.find();

          res.json(companies);
     },

     async store(req, res) {

          try {
               const { cnpj } = req.body;

               const apiResponde = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)

               const {
                    atividade_principal,
                    fantasia,
                    nome,
                    logradouro,
                    numero,
                    municipio,
                    cep
               } = apiResponde.data;

               let company = await Company.findOne({ cnpj });

               if (!company) {

                    const address = `${logradouro}, ${numero}, ${municipio}, ${cep}`

                    company = await Company.create({
                         cnpj,
                         name: fantasia,
                         corporateName: nome,
                         address,
                         primaryActivity: atividade_principal[0].text
                    });

                    return res.status(200).json(company);

               }

               res.status(400).send("Empresa ja cadastrado!");
          }
          catch (err) {
               res.status(400).send("Erro no servidor!");
          }
     }

}