const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
     cnpj: {
          type: String,
          required: true,
     },
     name: {
          type: String,
          required: true
     },
     corporateName: {
          type: String,
          required: true
     },
     address: {
          type: String,
          required: true
     },
     primaryActivity: {
          type: String,
          required: true
     },

});

module.exports = mongoose.model('Company', CompanySchema);