import React, { useState } from 'react';


const likePost = async (post, updatePostLikes) => {
  const response = await fetch(`http://localhost:3001/users/test@test.com/posts/${post.post_title}/like`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      currentUsername: 'tesst',
      likes: post.likes + 1 }),
  });

  if (response.ok) {
    const updatedPost = await response.json();
    updatePostLikes(post.post_title, updatedPost.likes);
  }
};

const Posts = ({username}) => {

  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const fetchPosts = async () => {
    const response = await fetch(`http://localhost:3001/users/${username}/posts`);
    const data = await response.json();
    setPosts(data);
    setCurrentUser(username);
  }

  const updatePostLikes = (postTitle, newLikes) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.post_title === postTitle ? { ...post, likes: newLikes } : post
      )
    );
  };



  return (
    <div>
      <h2>Posts</h2>
      <button onClick={fetchPosts}>Fetch Posts</button>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h3>{post.post_title}</h3>
            <img src={post.post_image_url} alt={post.post_title} />
            <p>{post.meal_type}</p>
            <div>
              <p>{post.likes} likes</p>
              <button onClick={() => likePost(post, updatePostLikes)}>Like</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
