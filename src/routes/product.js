import express from 'express';
import Product from '../models/Product';

const router = express.Router();

router.post('/', (req, res) => {
	console.log('create request', req.body.product);
	Product.create({ ...req.body.product })
		.then((product) => res.json({ product }))
		.catch((err) => res.status(400).json({ errors: { global: 'An error occurs while creating product.' } }));
});

router.get('/', (req, res) => {
	Product.find({}).then((products) => {
		res.json({ products });
	});
});

router.post('/update', (req, res) => {
	Product.findOneAndUpdate({ _id: req.body.product._id }, { ...req.body.product }, { new: true })
		.then(() => {
			res.json('Updated');
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json({ errors: { global: 'Error when updating product.' } });
		});
});

router.post('/delete', (req, res) => {
	Product.deleteOne({ ...req.body.product })
		.then(() => {
			res.json('Deleted');
		})
		.catch((err) => {
			res.status(400).json({ errors: { global: 'Error when deleting product.' } });
		});
});

export default router;
