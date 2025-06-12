import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";

const GalaxyButton = ({ text = "Details", type, id, item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${type}/${id}/details`, { state: { item } });
  };

  return (
    <button
      className="galaxy-btn flex items-center gap-2"
      onClick={handleClick}
    >
      <span>{text}</span>
      <ChevronRight size={20} />
      <div className="stars" />
    </button>
  );
};

export default GalaxyButton;
