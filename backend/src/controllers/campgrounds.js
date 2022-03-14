const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })
const { cloudinary } = require('../cloudinary');



module.exports.index = async (req, res, next) => {
	const campgrounds = await Campground.find().sort({ "_id": -1 })
	res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
	res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
	const geoData = await geocoder.forwardGeocode({
		query: req.body.campground.location,
		limit: 1
	}).send();
	const campground = new Campground(req.body.campground);
	campground.geometry = geoData.body.features[0].geometry;
	campground.images = req.files.map(elm => ({ url: elm.path, filename: elm.filename }))
	campground.author = req.user._id;
	await campground.save()
	console.log(campground)
	req.flash('success', 'Successfully created a new campground!')
	res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async (req, res, next) => {
	const campground = await Campground.findById(req.params.id).populate({
		path: 'reviews',
		populate: {
			path: 'author'
		}
	}).populate('author')
	if (!campground) {
		req.flash('error', 'Campground not found!');
		return res.redirect('/campgrounds')
	}
	res.render('campgrounds/show', { campground, msg: req.flash() })
}

module.exports.renderEditForm = async (req, res, next) => {
	const { id } = req.params
	const campground = await Campground.findById(id)
	if (!campground) {
		req.flash('error', 'Campground not found!');
		return res.redirect('/campgrounds')
	}
	res.render(`campgrounds/edit`, { campground })
}

module.exports.updateCampground = async (req, res, next) => {
	const { id } = req.params
	const geoData = await geocoder
		.forwardGeocode({
			query: req.body.campground.location,
			limit: 1,
		})
		.send();
	console.log(req.body);
	const campground = await Campground.findByIdAndUpdate(id,
		{ ...req.body.campground }, { new: true });
	const imgs = req.files.map(elm => ({ url: elm.path, filename: elm.filename }))
	campground.images.push(...imgs)
	campground.geometry = geoData.body.features[0].geometry;
	if (req.body.deleteImages) {
		for (let elm of req.body.deleteImages) {
			await cloudinary.uploader.destroy(elm)
		}
		await campground.updateOne(
			{ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
		console.log(campground)
	}
	await campground.save()
	req.flash('success', 'Successfully updated campground!!')
	res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res, next) => {
	const { id } = req.params
	const campground = await Campground.findByIdAndDelete(id);

	if (!campground.author.equals(req.user._id)) {
		req.flash('error', 'You do not have permission to do that!');
		return res.redirect(`/campgrounds/${id}`)
	}
	req.flash('success', 'Successfully deleted campground!!')
	res.redirect(`/campgrounds`)
}