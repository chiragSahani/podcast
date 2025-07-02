import React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import ColorHomeIcon from "../../assets/upload/ColorHomeIcon.png";
import countryIcon from "../../assets/upload/countryIcon.png";
import NotificationIcon from "../../assets/NavBar/NotificationIcon.png";
import { useNavigate } from "react-router-dom";

const SecondNav = ({ projectName, pageName  }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-between">
      {/* first section */}
      <section>
        <div className="flex justify-center items-center font-roboto text-md font-semibold cursor-pointer">
          <img
            src={ColorHomeIcon}
            alt="Home"
            className="cuser-pointer md:w-6 w-4"
            onClick={ () => navigate('/') }
          />
          <span   onClick={ () => navigate(`/projects`) } className="text-center px-1 pt-1 text-gray-500"> / {projectName} </span>
          <span className="text-center px-1 pt-1 text-primary " > / {pageName} </span>
        </div>
      </section>
      {/* second section */}
      <section>
        <div className="flex items-center font-roboto font-semibold gap-3">
          <TiArrowSortedDown />
          <p className="font-roboto font-semibold text-sm"> EN </p>
          < img className="md:w-6 w-5" src={ countryIcon } alt='country' />
          <img
            className="w-7 h-7 mr-6 ml-2 cursor-pointer hover:scale-110 duration-300"
            src={NotificationIcon}
            alt="Notifications"
            title="Notifications"
          />
        </div>
        
      </section>
    </div>
  );
};

export default SecondNav;
