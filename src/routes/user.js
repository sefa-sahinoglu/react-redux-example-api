import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/register', (req, res) => {
	const { email, password } = req.body.user;
	const user = new User({ email });
	const isAnyUser = User.findOne({ email: email }).then((isExistingUser) => {
		if (isExistingUser !== null) {
			res.status(400).json({ errors: { global: 'User already exists' } });
		} else {
			user.setPassword(password);
			user
				.save()
				.then((userRecord) => {
					res.json({ user: user.toAuthJSON() });
				})
				.catch((err) => {
					res.status(400).json({ errors: { global: 'Error on sign up' } });
				});
		}
	});
});

export default router;
