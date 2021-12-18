var mongoose = require('mongoose');
var Schema = mongoose.Schema;

productSchema = new Schema({
	name: String,
	category: String,
	productAmount: Number,
	amountUnit: String,
	company: String,
}),
	product = mongoose.model('product', productSchema);

module.exports = product;