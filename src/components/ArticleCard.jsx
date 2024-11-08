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
  tagLink,
  tagIcon,
} from "../styles/ArticleCard.module.css";
import AuthorIcon from "../icons/author.svg?react";
import VoteIcon from "../icons/votes.svg?react";
import CommentIcon from "../icons/comments.svg?react";

export const ArticleCard = ({ article }) => {
  const {
    article_id,
    title,
    topic,
    author,
    article_img_url,
    votes,
    comment_count,
  } = article;
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
        <span className={`${tag} ${tagLink}`}>
          <Link to={`/?topic=${topic}`} className="link">
            {topic}
          </Link>
        </span>
        <span className={tag}>
          <AuthorIcon className={tagIcon} />
          {author}
        </span>
        <span className={tag}>
          <VoteIcon className={tagIcon} />
          {votes}
        </span>
        <span className={tag}>
          <CommentIcon className={tagIcon} />
          {comment_count}
        </span>
      </div>
    </div>
  );
};
