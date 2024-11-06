import { commentCard, commentHeader } from "../styles/CommentCard.module.css";
import {
  submitButton,
  posted,
  commentBody,
} from "../styles/AddComment.module.css";

export const AddComment = ({
  user,
  handleSubmit,
  commentInput,
  setCommentInput,
  postStatus,
}) => {
  return (
    <li>
      <form onSubmit={handleSubmit} className={commentCard}>
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
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          className={commentBody}
          placeholder="Have your say..."
        />
      </form>
    </li>
  );
};
