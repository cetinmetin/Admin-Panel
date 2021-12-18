var mongoose = require('mongoose');
var Schema = mongoose.Schema;

companySchema = new Schema({
    name: String,
    legalNumber: String,
    incorporationCountry: String,
    website: String
}),
    company = mongoose.model('company', companySchema);

module.exports = company;