const express = require('express');
//const { createUser, getUsers, updateUser, deleteUser, getSingleUser } = require('./crud');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const users = [];


app.get('/users', async (req, res) => {
  res.json(users);
});

app.post('/users', async (req, res) => {
  if (users.find(user => user.username === req.body.username)) {
    return res.status(400).send('User already exists');
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, name: req.body.name, password: hashedPassword, profileVisibility: req.body.profileVisibility, posts: [] };
    users.push(user);
    res.status(201).send("User created successfully");
  } catch {
    res.status(500).send("Error creating user");
  }
});

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.username === req.body.username);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send({username: user.username});
    }
    else {
      res.send('Not Allowed');
    }
  } catch {
    res.status(500).send("Error logging in");
  }
})

app.post('/users/:username/posts', async (req, res) => {
  const user = users.find(user => user.username === req.params.username);
  const post = { 
    post_title: req.body.post_title, 
    post_image_url: req.body.post_image_url, 
    meal_type: req.body.meal_type,
    likes: 0,
    liked_by: [],
    comments: []
  };
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  user.posts.push(post);
  res.status(201).send("Post created successfully");
});

app.get('/users/:username/posts', async (req, res) => {
  const user = users.find(user => user.username === req.params.username);
  if (user == null) {
    return res.status(400).send('Cannot find user');
  }
  res.json(user.posts);
});

app.patch('/users/:username/posts/:post_title/like', async (req, res) => {
  const user = users.find(user => user.username === req.params.username);
  const post = user.posts.find(post => post.post_title === req.params.post_title);
  if (user == null || post == null) {
    return res.status(400).send('Cannot find user or post');
  }
  if (post.liked_by.includes(req.body.currentUsername)) {
    return res.status(400).send('Post already liked by user');
  }
  else {
    post.likes = req.body.likes;
    post.liked_by.push(req.body.currentUsername);
    res.json(post);
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});