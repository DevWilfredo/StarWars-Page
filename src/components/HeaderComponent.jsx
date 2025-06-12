const HeaderComponent = ({ type }) => {
  return (
    <h2 className="text-white text-xl font-bold mb-4">
      Databank <span className="text-[#ffe81f]">|</span> {type}
    </h2>
  );
};

export default HeaderComponent;
