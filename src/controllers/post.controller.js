const postRepository = require('../repositories/post.repository');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postRepository.findAll();
    console.log(posts);
    res.render('posts/index', {
      title: 'Posts',
      posts: posts,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to fetch posts',
    });
  }
};

exports.createPost = async (req, res) => {
  const { url, lat, lng } = req.body;
  try {
    const newPost = await postRepository.create({ url, lat, lng });
    console.log('Created post:', newPost);
    // res.redirect('/posts');
    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to create post',
    });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postRepository.findById(id);
    if (!post) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Post not found',
      });
    }
    console.log('Fetched post:', post);
    res.render('posts/detail', {
      title: 'Post Details',
      post: post,
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to fetch post',
    });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await postRepository.delete(id);
    if (!deletedPost) {
      return res.status(404).render('error', {
        title: 'Error',
        message: 'Post not found',
      });
    }

    res.redirect('/posts');
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to delete post',
    });
  }
};
