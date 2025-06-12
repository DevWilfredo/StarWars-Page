import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import Grid from "../components/Grid";
import LaserLoader from "../components/LaserLoader";
const IMG_URL = import.meta.env.VITE_IMG_URL;

const Details = () => {
  const [itemDetailInfo, setItemDetailInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const item = location.state?.item;
  const { type, id } = useParams();

  // Reinicia el scroll al top cuando cambia el id
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const fetchItemDetails = async () => {
    try {
      const response = await fetch(item.url);
      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setItemDetailInfo(data.result);
    } catch (error) {
      setItemDetailInfo(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    item?.url ? fetchItemDetails() : setLoading(false);
  }, [item]);

  if (loading) {
    return <LaserLoader />;
  }

  if (!itemDetailInfo) {
    return <div className="text-red-500">No se encontraron detalles.</div>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-around items-start gap-8 p-8 bg-black min-h-screen">
        <div className="w-full lg:w-1/2">
          <img
            src={`${IMG_URL}/${type}/${id}.jpg`}
            alt={itemDetailInfo.properties.name}
            className="object-cover rounded-lg border border-gray-700 shadow-lg"
          />
        </div>

        <div className="bg-[#1C1C1C] text-[#F5F5F5] rounded-xl shadow-xl w-full lg:w-1/2 p-6 border border-[#2D2D2D] backdrop-blur-sm">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-[#FFE81F]">
              {itemDetailInfo.properties.name}
            </h3>
            <p className="text-sm text-[#A0AEC0] mt-2">
              {itemDetailInfo.description}
            </p>
          </div>
          <div className="divide-y divide-[#2D2D2D]">
            {Object.entries(itemDetailInfo.properties)
              .filter(
                ([key]) =>
                  ![
                    "created",
                    "edited",
                    "films",
                    "url",
                    "pilots",
                    "homeworld",
                  ].includes(key)
              )
              .map(([key, value]) => (
                <div key={key} className="py-4 grid grid-cols-3 gap-4">
                  <dt className="font-medium text-[#A0AEC0] capitalize">
                    {key.replace(/_/g, " ")}
                  </dt>
                  <dd className="col-span-2">{value}</dd>
                </div>
              ))}
          </div>
        </div>
      </div>
      {type === "people" && (
        <section className="mt-12 px-8">
          <h2 className="text-white text-xl font-bold mb-4">
            Otros personajes de interés
          </h2>
          <Grid type="people" excludeId={id} />
        </section>
      )}

      {type === "vehicles" && (
        <section className="mt-12 px-8">
          <h2 className="text-white text-xl font-bold mb-4">
            Otros vehículos de interés
          </h2>
          <Grid type="vehicles" excludeId={id} />
        </section>
      )}

      {type === "planets" && (
        <section className="mt-12 px-8">
          <h2 className="text-white text-xl font-bold mb-4">
            Otros planetas de interés
          </h2>
          <Grid type="planets" excludeId={id} />
        </section>
      )}
    </>
  );
};

export default Details;
