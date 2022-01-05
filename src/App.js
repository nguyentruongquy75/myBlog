import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import PostsPage from "./pages/PostsPage";
import UsefulPage from "./pages/UsefulPage";

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post/:slug" element={<PostDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/useful" element={<UsefulPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
