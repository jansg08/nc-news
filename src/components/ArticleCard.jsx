import { Link } from "react-router-dom";
import {
  articleCard,
  imgAndTitle,
  imgLink,
  titleLink,
  articleImg,
  articleTitle,
  tags,
  tag,
  tagIcon,
} from "../styles/ArticleCard.module.css";
import Author from "../icons/author.svg?react";

export const ArticleCard = ({ article }) => {
  const { article_id, title, topic, author, article_img_url } = article;
  return (
    <div className={articleCard}>
      <div className={imgAndTitle}>
        <Link to={`/articles/${article_id}`} className={imgLink + " link"}>
          <img className={articleImg} src={article_img_url} />
        </Link>
        <Link to={`/articles/${article_id}`} className={titleLink + " link"}>
          <h3 className={articleTitle}>{title}</h3>
        </Link>
      </div>
      <div className={tags}>
        <span className={tag}>
          <Link to={`/?topic=${topic}`} className="link">
            {topic}
          </Link>
        </span>
        <span className={tag}>
          <Author className={tagIcon} />
          {author}
        </span>
      </div>
    </div>
  );
};
