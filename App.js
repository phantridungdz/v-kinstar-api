import * as React from "react";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext"
import Navigation from "./Navigation";

const App = () => {
  console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
  console.disableYellowBox = true;
  return (

      <AuthProvider>
          <PostProvider >
            <Navigation />
          </PostProvider>
      </AuthProvider>

  )
}

export default App;
