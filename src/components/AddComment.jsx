import { commentCard, commentHeader } from "../styles/CommentCard.module.css";
import {
  submitButton,
  posted,
  commentBody,
} from "../styles/AddComment.module.css";
import { Link, useLocation } from "react-router-dom";

export const AddComment = ({
  user,
  handleSubmit,
  commentInput,
  setCommentInput,
  postStatus,
}) => {
  const { pathname } = useLocation();
  return (
    <li>
      <form onSubmit={handleSubmit} className={commentCard}>
        {user.username ? (
          <>
            <div className={commentHeader}>
              <img src={user.avatar_url} className="avatar avatar-small" />
              <span>You</span>
              <button
                disabled={postStatus === "Posting"}
                type="submit"
                className={`${
                  postStatus === "Posted 😁" && posted
                } ${submitButton}`}
              >
                {postStatus}
              </button>
            </div>
            <textarea
              required
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className={commentBody}
              placeholder="Have your say..."
            />
          </>
        ) : (
          <p style={{ margin: "0" }}>
            Please{" "}
            <Link
              to={`/login?redirect=${pathname.replace("/", "%2F")}`}
              className="link"
              style={{ textDecoration: "underline" }}
            >
              log in
            </Link>{" "}
            to comment on this article
          </p>
        )}
      </form>
    </li>
  );
};
