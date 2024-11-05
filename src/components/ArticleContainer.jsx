import { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { useParams } from "react-router-dom";
import { ArticleHeader } from "./ArticleHeader";

export const ArticleContainer = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [author, setUser] = useState({});

  useEffect(() => {
    apiClient
      .get(`/articles/${article_id}`)
      .then(({ data }) => {
        setArticle(data.article);
        return apiClient.get(`/users/${data.article.author}`);
      })
      .then(({ data }) => setUser(data.user));
  }, []);
  return (
    <>
      <header>
        <h2>{article.title}</h2>
        <div>
          <img src={author.avatar_url} className="avatar avatar-big" />
          <div>
            <span>Written by</span>
            <span>{author.name}</span>
          </div>
        </div>
        <img src={article.article_img_url} />
      </header>
      <p>{article.body}</p>
    </>
  );
};
