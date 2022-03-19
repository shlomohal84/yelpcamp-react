if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
};


const mongoose = require('mongoose');
const User = require('../models/user');
const Campground = require('../models/campground');
const Review = require('../models/review');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const lorem = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, eaque facilis a perferendis laboriosam odio. Itaque pariatur labore eum perspiciatis dolorem quae minima nesciunt velit dolor. Dolor dignissimos eos dolorem!"

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelpCamp'
mongoose.connect(dbUrl);

// mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:\n'));
db.once('open', () => {
	console.log("Database connected")
})

const sample = arr => arr[Math.floor(Math.random() * arr.length)]

const seedDB = async () => {
	await Campground.deleteMany({});
	await Review.deleteMany({});
	for (let i = 0; i < 200; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10
		const camp = new Campground({
			author: "61c30cee3561c2e2a740ee58",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			geometry: {
				type: 'Point',
				coordinates: [cities[random1000].longitude,cities[random1000].latitude]
			},
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [{
				url: "https://res.cloudinary.com/snackeater/image/upload/v1639777307/YelpCamp/florian-rieder-4CZw9SE0TMA-unsplash_1_jxu7cr.jpg",
				filename: "YelpCamp/florian-rieder-4CZw9SE0TMA-unsplash_1_jxu7cr.jpg"
			},
			{
				url: "https://res.cloudinary.com/snackeater/image/upload/v1639239472/YelpCamp/ize5bggkwzmo0xqw1pz8.jpg",
				filename: "YelpCamp/ize5bggkwzmo0xqw1pz8.jpg"

			}],
			description: lorem,
			price,
		})
		await camp.save()
	}
}

seedDB().then(() => {
	db.close();
})