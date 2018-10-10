import mongoose from 'mongoose';

//todo:add uniquness to email
const schema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		quantity: { type: Number, required: true },
		price: { type: Number, required: true }
	},
	{ timestamps: true }
);

export default mongoose.model('Product', schema);
