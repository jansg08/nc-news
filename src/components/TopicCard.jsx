import { Link } from "react-router-dom";

export const TopicCard = ({ topic }) => {
  return (
    <Link to={`/?topic=${topic.slug}`} className="link">
      <div className="big-card">
        <div className="relative">
          <img
            src={`/src/imgs/${topic.slug}.jpg`}
            className="w-full aspect-video object-cover"
          />
          <span className="box-border underline text-xl h-8 flex items-center bg-secondary-bg px-2 py-1 rounded-full absolute right-4 bottom-6">
            {topic.slug}
          </span>
        </div>
        <p className="py-1">{topic.description}</p>
      </div>
    </Link>
  );
};
