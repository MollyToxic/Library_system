
import './App.css';

import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, [])
  function deletePost(id){
    const newPosts = posts.filter((post)=> id!==post.id)

    setPosts(newPosts)
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          My first application
        </p>
        <table border="1" width="1200px" height="100px">
          <thead>
            <tr>
              <td>userId</td>
              <td>id</td>
              <td>title</td>
              <td>body</td>
              <td>actions</td>
            </tr>
          </thead>
          <tbody>
            {posts.map(post =>
              <tr key={post.id}>
                <td>{post.userId}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td><button onClick={()=> deletePost(post.id)}>D</button></td>
              </tr>)}

          </tbody>

        </table>
      </header>
    </div>
  );
}


export default App;
