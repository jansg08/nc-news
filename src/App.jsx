import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { PageHeader } from "./components/PageHeader";
import { useState } from "react";
import { ListContainer } from "./components/ListContainer";
import { ArticleContainer } from "./components/ArticleContainer";
import { ErrorCard } from "./components/ErrorCard";
import { PaddedContainer } from "./components/PaddedContainer";
import { Login } from "./components/Login";
import { AuthProvider } from "./hooks/useAuth.jsx";

import PopularIcon from "./icons/popular.svg?react";
import TopicsIcon from "./icons/topics.svg?react";
import SortIcon from "./icons/sort.svg?react";
import LoginIcon from "./icons/login.svg?react";

function App() {
  const [user, setUser] = useState({
    username: "icellusedkars",
    name: "sam",
    avatar_url: "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
  });
  return (
    <AuthProvider>
      <Header />
      <main>
        <Routes>
          <Route
            path="*"
            element={
              <PaddedContainer>
                <ErrorCard error="404" problem="page" />
              </PaddedContainer>
            }
          />
          <Route
            path="/"
            element={
              <>
                <PageHeader
                  headingIcon={<PopularIcon className="icon icon-big" />}
                  heading="Popular"
                  buttonIcon={<SortIcon className="icon icon-big" />}
                />
                <ListContainer type="articles" />
              </>
            }
          />
          <Route
            path="/topics"
            element={
              <>
                <PageHeader headingIcon={<TopicsIcon />} heading="Topics" />
                <ListContainer type="topics" />
              </>
            }
          />
          <Route path="/articles/:article_id" element={<ArticleContainer />} />
          <Route
            path="/login"
            element={
              <>
                <PageHeader headingIcon={<LoginIcon />} heading="Log in" />
                <PaddedContainer>
                  <Login />
                </PaddedContainer>
              </>
            }
          />
        </Routes>
      </main>
    </AuthProvider>
  );
}

export default App;
