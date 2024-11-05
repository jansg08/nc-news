import { Link } from "react-router-dom";
import {
  articleCard,
  articleImg,
  articleTitle,
  tags,
} from "../styles/ArticleCard.module.css";
import Author from "../icons/author.svg?react";

export const ArticleCard = ({ article }) => {
  const { article_id, title, topic, author, article_img_url } = article;
  return (
    <div className={articleCard}>
      <Link to={`/articles/${article_id}`} className="link">
        <img className={articleImg} src={article_img_url} />
      </Link>
      <Link to={`/articles/${article_id}`} className="link">
        <h3 className={articleTitle}>{title}</h3>
      </Link>
      <div className={tags}>
        <Link to={`/?topic=${topic}`} className="link">
          <span>{topic}</span>
        </Link>
        <span>
          <Author />
          {author}
        </span>
      </div>
    </div>
  );
};
