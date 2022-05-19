const Post = require('../model/Post');

async function getAllPosts(req, res) {
	const posts = await Post.find();
	if (!posts) return res.status(204).json({ error: 'No posts found' });
	res.json(posts);
}

async function getSinglePost(req, res) {
	if (!req?.params?.id)
		return res.status(400).json({ error: 'Post ID required' });
	const post = await Post.findOne({ _id: req.params.id }).exec();
	if (!post)
		return res
			.status(204)
			.json({ error: `No post matching ID ${req.params.id}` });
	res.json(post);
}

async function createPost(req, res) {
	if (!req?.body?.title)
		return res.status(400).json({ error: 'Post must have a title' });
	if (!req?.body?.body)
		return res.status(400).json({ error: 'Post must have a body' });

	try {
		const now = new Date().toLocaleString();
		const result = await Post.create({
			title: req.body.title,
			body: req.body.body,
			createdAt: now,
			lastUpdated: now,
		});
		res.status(201).json(result);
	} catch (error) {
		console.log(error);
	}
}

async function deletePost(req, res) {
	if (!req?.body?.id)
		return res.status(400).json({ error: 'Post ID required' });

	const post = await Post.findOne({ _id: req.body.id });
	if (!post)
		return res
			.status(204)
			.json({ error: `No post matching ID ${req.body.id}` });
	const result = await post.deleteOne({ _id: req.body.id });
	res.json(result);
}

async function updatePost(req, res) {
	if (!req?.body?.id)
		return res.status(400).json({ error: 'Post ID required' });
	const post = await Post.findOne({ _id: req.body.id }).exec();
	if (!post)
		return res
			.status(204)
			.json({ error: `No post matching ID ${req.body.id}` });
	if (req.body.title) post.title = req.body.title;
	if (req.body.body) post.body = req.body.body;
	post.lastUpdated = new Date().toLocaleString();
	const result = await post.save();
	res.json(result);
}

module.exports = {
	getAllPosts,
	getSinglePost,
	createPost,
	deletePost,
	updatePost,
};
