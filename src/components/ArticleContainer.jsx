import { useContext, useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { useParams } from "react-router-dom";
import {
  articleContainer,
  articleHeader,
  authorAndVotes,
  writtenBy,
  articleImg,
  commentsHeading,
  commentsList,
  votingBlock,
  voteButton,
  voteIcon,
  upVoted,
  downVoted,
  votes,
} from "../styles/ArticleContainer.module.css";
import { CommentCard } from "./CommentCard";
import UpVote from "../icons/up-vote.svg?react";
import DownVote from "../icons/down-vote.svg?react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { patchArticleVotes } from "../utils/patchArticleVotes";
import { UserContext } from "../contexts/User";
import { LoadingWithHash } from "./LoadingWithHash";
import { LoadingWithBar } from "./LoadingWithBar";

export const ArticleContainer = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [author, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [hasVoted, setHasVoted] = useLocalStorage("hasVoted", 0);
  const [votes, setVotes] = useState(0);
  const { user } = useContext(UserContext);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  useEffect(() => {
    setLoadingArticle(true);
    setLoadingComments(true);
    apiClient
      .get(`/articles/${article_id}`)
      .then(({ data }) => {
        setLoadingArticle(false);
        setArticle(data.article);
        setVotes(data.article.votes);
        return apiClient.get(`/users/${data.article.author}`);
      })
      .then(({ data }) => setUser(data.user));

    apiClient.get(`/articles/${article_id}/comments`).then(({ data }) => {
      setLoadingComments(false);
      setComments(data.comments);
    });
  }, []);

  const handleVote = (e) => {
    let comparison = Number(e.target.id || e.target.parentElement.id);
    if (hasVoted === comparison) {
      comparison = -comparison;
    } else if (hasVoted === -comparison) {
      comparison *= 2;
    }
    patchArticleVotes(article.article_id, comparison, setHasVoted, setVotes);
  };

  return (
    <div className={articleContainer}>
      {loadingArticle && (
        <LoadingWithHash currentlyLoading="article" colour="#a3adde" />
      )}
      {loadingArticle || (
        <>
          <header className={articleHeader}>
            <h2>{article.title}</h2>
            <div className={authorAndVotes}>
              <img src={author.avatar_url} className="avatar avatar-big" />
              <div className={writtenBy}>
                <span>Written by</span>
                <span>
                  {article.author === user.username ? "You" : author.name}
                </span>
              </div>
              <div className={votingBlock}>
                <button onClick={handleVote} className={voteButton} id="1">
                  <UpVote
                    id="1"
                    className={`${voteIcon} ${hasVoted === 1 && upVoted}`}
                  />
                </button>
                <span className={votes}>{votes}</span>
                <button id="-1" onClick={handleVote} className={voteButton}>
                  <DownVote
                    id="-1"
                    className={`${voteIcon} ${hasVoted === -1 && downVoted}`}
                  />
                </button>
              </div>
            </div>
            <img src={article.article_img_url} className={articleImg} />
            <hr className="h-rule" />
          </header>
          <p>{article.body}</p>
        </>
      )}
      <div>
        <hr className="h-rule" />
        <h2 className={commentsHeading}>Comments</h2>
        {loadingComments && (
          <LoadingWithBar currentlyLoading="comments" colour="#2bb634" />
        )}
        {loadingComments || (
          <ul className={commentsList}>
            {comments.map((comment) => (
              <CommentCard key={comment.comment_id} comment={comment} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
