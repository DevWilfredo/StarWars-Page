import { useAppContext } from "../context/AppContext";
import Card from "./Card";
export default function Grid({ type, excludeId }) {
  const { people, vehicles, planets } = useAppContext();

  const dataMap = {
    people,
    vehicles,
    planets,
  };

  let items = dataMap[type] || [];
  if (excludeId) {
    items = items.filter((item) => String(item.uid) !== String(excludeId));
  }

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex gap-6 whitespace-nowrap">
          {items.map((item) => (
            <div
              key={item.uid}
              className="inline-block min-w-[250px] hover:scale-105 transition-all p-5"
            >
              <Card char={item} type={type} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
