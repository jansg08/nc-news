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

export const ArticleCard = ({ article, firstItem }) => {
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
    <div className={`big-card ${firstItem && "row-span-2 sm:col-span-2"}`}>
      <div className={imgAndTitle}>
        <Link
          to={`/articles/${article_id}`}
          className={`link w-1/2 ${firstItem && "sm:w-3/4"}`}
        >
          <img className={articleImg} src={article_img_url} />
        </Link>
        <Link
          to={`/articles/${article_id}`}
          className={`link w-1/2 ${firstItem && "sm:w-1/4"}`}
        >
          <p className={`text-left text-xl ${firstItem && "sm:text-3xl"}`}>
            {title}
          </p>
        </Link>
      </div>
      <div className="flex gap-[5px] items-end h-full">
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
