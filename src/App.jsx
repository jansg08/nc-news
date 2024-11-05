import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { PageHeader } from "./components/PageHeader";
import { useState } from "react";
import { ListContainer } from "./components/ListContainer";
import { ArticleContainer } from "./components/ArticleContainer";

function App() {
  const [user, setUser] = useState({
    username: "icellusedkars",
    name: "sam",
    avatar_url: "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
  });
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PageHeader iconSrc="../icons/menu.svg" heading="Popular" />
                <ListContainer />
              </>
            }
          />
          <Route path="/articles/:article_id" element={<ArticleContainer />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
