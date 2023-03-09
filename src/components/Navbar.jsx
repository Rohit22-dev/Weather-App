import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { FcSearch } from "react-icons/fc";

const Navbar = ({ city, setWeather, setCity }) => {
  const [ctime, setTime] = useState("");
  const [boxInput, setBoxInput] = useState("");

  const UpdateTime = () => {
    const time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime, 1000);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setCity(boxInput);
      setBoxInput("");
    }
  };

  const handleSearchClick = () => {
    setCity(boxInput);
    setBoxInput("");
  };

  return (
    <div className="flex flex-col glass p-3 items-center gap-4">
      <div className="flex h-fit w-4/5 justify-between items-center">
        <p className="text-2xl font-display text-white">Weather </p>
        <div className="flex gap-1 group ">
          <MdLocationOn
            className="left-5 group-hover:animate-bounce"
            size={20}
          />
          <p className="text-xl font-semibold">{city ? city : "City"}</p>
        </div>

        <p className="">{ctime}</p>
      </div>
      <div className="w-4/5 grid place-items-center">
        <div className="relative flexx w-full md:w-1/2 flex-[0.5]">
          <FcSearch
            className="h-5 w-5 absolute left-5 text-black cursor-pointer"
            onClick={handleSearchClick}
          />
          <input
            placeholder="Search city..."
            value={boxInput}
            className="bg-neutral-200 w-full p-3 rounded-full pl-12 text-xs outline-none text-black shadow-inner shadow-gray-500"
            onChange={(e) => setBoxInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
