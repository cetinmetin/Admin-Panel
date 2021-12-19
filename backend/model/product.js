var mongoose = require('mongoose');
var Schema = mongoose.Schema;

productSchema = new Schema({
	productName: String,
	category: String,
	productAmount: String,
	amountUnit: String,
	company: String,
}),
	product = mongoose.model('product', productSchema);

module.exports = product;