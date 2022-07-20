// import Home from "./components/home/Home.jsx";
// import Signup from "./components/LoginSignup/Signup.jsx";
// import Topbar from "./components/topbar/Topbar.jsx";
// import Card from "./components/cards/Card.jsx";

import Login from "./components/LoginSignup/Login.jsx";
import BlogStat from "./context/Blog/BlogState.js";

function App() {
  return (
    <>
    <BlogStat>
      {/* <Topbar /> */}
      {/* <Home /> */}
      {/* <Card /> */}
      {/* <Signup /> */}
    </BlogStat>
      <Login />
    </>
  );
}

export default App;
