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
    <Link to={`/articles/${article_id}`} className="link">
      <div className={articleCard}>
        <img className={articleImg} src={article_img_url} />
        <h3 className={articleTitle}>{title}</h3>
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
    </Link>
  );
};
