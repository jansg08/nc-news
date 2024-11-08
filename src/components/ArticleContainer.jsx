import { useContext, useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  numberOfVotes,
} from "../styles/ArticleContainer.module.css";
import { CommentCard } from "./CommentCard";
import UpVote from "../icons/up-vote.svg?react";
import DownVote from "../icons/down-vote.svg?react";
import { useLocalStorage } from "../hooks/useStorage";
import { patchArticleVotes } from "../utils/patchArticleVotes";
import { useAuth } from "../hooks/useAuth";
import { LoadingWithHash } from "./LoadingWithHash";
import { LoadingWithBar } from "./LoadingWithBar";
import { AddComment } from "./AddComment";
import { ErrorCard } from "./ErrorCard";

export const ArticleContainer = () => {
  const { article_id } = useParams();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [hasVoted, setHasVoted] = useLocalStorage(
    `${user.username}hasVotedOn${article_id}`,
    0
  );
  const [votes, setVotes] = useState(0);
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [articleError, setArticleError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [postStatus, setPostStatus] = useState("Post");
  const [commentAuthors, setCommentAuthors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setLoadingArticle(true);
    setLoadingComments(true);
    apiClient
      .get(`/articles/${article_id}`)
      .then(({ data }) => {
        setLoadingArticle(false);
        setArticle(data.article);
        setVotes(data.article.votes);
        return Promise.all([
          apiClient.get(`/users/${data.article.author}`),
          apiClient.get(`/articles/${article_id}/comments`, {
            params: { limit: data.article.comment_count },
          }),
        ]);
      })
      .then(([authorData, commentsData]) => {
        const { comments } = commentsData.data;
        const usersToFetch = comments
          .map(({ author }) => author)
          .filter((el, i, arr) => arr.indexOf(el) === i)
          .map((author) => apiClient.get(`/users/${author}`));
        setLoadingComments(false);
        setAuthor(authorData.data.user);
        setComments(comments);
        return Promise.allSettled(usersToFetch);
      })
      .then((usersData) => {
        const usersByUsername = {};
        usersData.forEach(
          (user) =>
            (usersByUsername[user.value.data.user.username] =
              user.status === "fulfilled" ? user.value.data.user : null)
        );
        setCommentAuthors(usersByUsername);
      })
      .catch((err) => {
        if (err.message.startsWith("timeout")) {
          setArticleError(<ErrorCard error="Timeout" />);
        } else if (err.response.status === 400) {
          setArticleError(<ErrorCard error="400" />);
        } else if (
          err.response.status === 404 &&
          !err.request.responseURL.includes("users")
        ) {
          if (err.request.responseURL.includes("comments")) {
            setLoadingComments(false);
            setCommentError(<ErrorCard error="404" problem={"comments"} />);
          } else {
            setLoadingComments(false);
            setLoadingArticle(false);
            setArticleError(<ErrorCard error="404" problem={"article"} />);
          }
        }
      });
  }, []);

  const handleVote = (e) => {
    if (!user.username) {
      navigate(`/login?redirect=${pathname.replace("/", "%2F")}`);
    }
    let comparison = Number(e.target.id || e.target.parentElement.id);
    if (hasVoted === comparison) {
      comparison = -comparison;
    } else if (hasVoted === -comparison) {
      comparison *= 2;
    }
    patchArticleVotes(article.article_id, comparison, setHasVoted, setVotes);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setPostStatus("Posting");
    console.log({
      username: user.username,
      body: commentInput,
    });
    console.log(`/articles/${article_id}/comments`);
    apiClient
      .post(`/articles/${article_id}/comments`, {
        username: user.username,
        body: commentInput,
      })
      .then(({ data }) => {
        setCommentInput("");
        setPostStatus("Posted 😁");
        setComments((currComments) => [data.comment, ...currComments]);
        setTimeout(() => setPostStatus("Post"), 5000);
      });
  };

  return (
    <div className={articleContainer}>
      {articleError}
      {loadingArticle && (
        <LoadingWithHash currentlyLoading="article" colour="#a3adde" />
      )}
      {!loadingArticle && !articleError && (
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
                <span className={numberOfVotes}>{votes}</span>
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
      {!articleError && (
        <div>
          <hr className="h-rule" />
          <h2 className={commentsHeading}>Comments</h2>
          <ul className={commentsList}>
            <AddComment
              user={user}
              handleSubmit={handleCommentSubmit}
              commentInput={commentInput}
              setCommentInput={setCommentInput}
              postStatus={postStatus}
            />
            {commentError}
            {loadingComments && (
              <LoadingWithBar currentlyLoading="comments" colour="#a3adde" />
            )}
            {loadingComments ||
              commentError ||
              comments.map((comment) => (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  author={
                    comment.author === user.username ? "You" : comment.author
                  }
                  authorAvatar={commentAuthors[comment.author]?.avatar_url}
                />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
