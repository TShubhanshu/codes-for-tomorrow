import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PostsProvider } from './context/PostsContext';

class ErrorBoundary extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hasError : false,
      error: null
    };
  }
  static getDerivedStateFormError(error){
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error , errorInfo){
    console.error("ErrorBoundary caught an error:",error,errorInfo);
  }

  render(){
    if(this.state.hasError){
      return (
        <div style={{padding: '20px' , color: 'red'}}>
          <h2>Something went wrong</h2>
          <p>{this.state.error.message}</p>
          <button onClick = {() => this.setState({hasError:false})}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <PostsProvider>
      <App/>
    </PostsProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

