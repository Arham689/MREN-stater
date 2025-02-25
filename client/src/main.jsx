"use client";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary , useErrorBoundary } from 'react-error-boundary'

import { Provider } from 'react-redux';
import { store } from './store';

function fallbackRender({ error, resetErrorBoundary }) {
  // Call  to reset the error boundary and retry the render.
  const {resetBoundary} = useErrorBoundary();
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetBoundary}>try again </button>
    </div>
  );
}


createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <ErrorBoundary  FallbackComponent={fallbackRender} >
      <App />
    </ErrorBoundary>
  </Provider>
)


// import React from 'react'
// import Browse from './Browse'
// import Login from './Login'
// import { createBrowserRouter  } from 'react-router-dom'
// import { RouterProvider } from 'react-router-dom'
// import SingleMovie from './SingleMovie'
// import ErrorElement from './ErrorElement'
// import YouTube from './YouTube'
// import YTSingleVideopage from './YTSingleVideopage'
// import YTSearchPage from './YTSearchPage'
// import { Contact } from './Contact'
// const Body = ()=>{
//     const myrouter = createBrowserRouter([
//         {
//           path:'/',
//           element:<Login/>,
//           errorElement : <ErrorElement/>
//         },
//         {
//           path : '/browse',
//           element : <Browse/> ,
//           errorElement : <ErrorElement/>
//         },
//         {
//           path : '/info/:id',
//           element : <SingleMovie/>,
//           errorElement : <ErrorElement/>
//         },
//         {
//           path : "/youtube",
//           element : <YouTube/>,
//           errorElement : <ErrorElement/>
//         },
//         {
//           path : '/TYBrows/:id',
//           element : <YTSingleVideopage/>
//         },
//         {
//           path : '/searchpage',
//           element : <YTSearchPage/>
//         },
//         {
//           path : '/contact',
//           element : <Contact/>
//         }

//       ])

//     return(
//         <>
//             <RouterProvider router={myrouter}/>
//         </>
//     )
// }

// export default Body