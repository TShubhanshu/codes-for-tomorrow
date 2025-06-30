import { useContext } from "react";
import { PostsProvider } from "./context/PostsContext";
import { useFetch } from "./hooks/useFetch";
import { PostsList } from "./components/PostsList";
import './App.css';
function App() {

  const context = useContext(PostsProvider);
  console.log('context value int App:', context);
  useFetch();

  return(
    ////<PostsProvider>
      <div className="App">
        <PostsList/>
      </div>
    //</PostsProvider>
  );
}

export default App;
