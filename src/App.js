import "./App.css";

import { useEffect, useState } from "react";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";

const userId = "1";

function App() {
  const [posts, setPosts] = useState([]);
  const [mode, setMode] = useState("table");
  const [inputValueTitle, setInputValueTitle] = useState("");
  const [inputValueBody, setInputValueBody] = useState("");

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then((response) => response.json())
  //     .then((json) => setPosts(json));
  // }, [])

  function deletePost(id) {
    const newPosts = posts.filter((post) => id !== post.id);
    setPosts(newPosts);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
  }

  function savePost() {
    console.log(inputValueTitle, inputValueBody);

    const rawPost = {
      userId,
      title: inputValueTitle,
      body: inputValueBody,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(rawPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((newPost) => {
        const newPosts = [...posts];
        newPosts.push(newPost);
        setPosts(newPosts);
      });
  }
  function resetForm(){
    setInputValueTitle('');
    setInputValueBody('');
  }
  function updatePosts() {
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify(posts),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((updatePosts) => console.log(updatePosts));
  }

  function createPost() {
    document.getElementById("table_1").style.display = "none";
    setMode("createPost");
  }

  function showTable() {
    document.getElementById("table_1").style.display = "block";
    setMode("table");
  }
  //добавить для таблицы условное отображение.
  //добавить для формы возможность выйти в режим таблицы.
  //добавить в форме кнопку, которая будет очищать поля.
  //добавить кнопку , которая позволит заново перезагрузить посты с сервера
  return (
    <div className="App">
      {mode === "createPost" ? (
        <>
          <Input
            inputValue={inputValueTitle}
            title={"title"}
            onChange={setInputValueTitle}
          />
          <Input inputValue={inputValueBody} title={"body"} onChange={setInputValueBody} />
          <div>
            <button onClick={savePost}>save</button>
            <button onClick={showTable}>show table</button>
            <button onClick={resetForm}>reset</button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="table-flex" id="table_1">
        <div>
          <button onClick={createPost}>create post</button>
          <button onClick={updatePosts}>update</button>
        </div>
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
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="column_userId">{post.userId}</td>
                <td className="column_id">{post.id}</td>
                <td className="column_title">{post.title}</td>
                <td className="column_body">{post.body}</td>
                <td className="column_button">
                  <button onClick={() => deletePost(post.id)}>D</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
