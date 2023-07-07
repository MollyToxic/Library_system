
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
    setPosts(newPosts);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    })
}


  return (
    <div className="App">
      <header className="App-header">
        <p>
          My first application
        </p>
        <div className='table-flex'>
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
                    <td className='column_userId'>{post.userId}</td>
                    <td className='column_id'>{post.id}</td>
                    <td className='column_title'>{post.title}</td>
                    <td className='column_body'>{post.body}</td>
                  <td className='column_button'><button onClick={() => deletePost(post.id)} >D</button></td>
                  </tr>)}
            </tbody>

          </table>
        </div>

      </header>
    </div>
  );
}


export default App;
