import { FaHouseChimney } from "react-icons/fa6";
import { FaChildren } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import { IoMdPhotos } from "react-icons/io";
import { FaGift } from "react-icons/fa6";

export default function Navbar() {
    return (
      <nav className="fixed bottom-0 w-full z-50 rounded-tl-2xl rounded-tr-2xl bg-ungu-500 text-white">
        <ul className="flex justify-around">
          <li>
             <a href="#home" className="flex flex-col items-center py-2">
                <FaHouseChimney className="text-xl" />
                <span className="text-xs">Home</span>
            </a>
            </li>
          <li>
            <a href="#mempelai" className="flex flex-col items-center py-2">
              <FaChildren className="text-xl" />
              <span className="text-xs">Mempelai</span>
             </a>
          </li>
         <li>
          <a href="#tanggal" className="flex flex-col items-center py-2">
            <FaCalendarAlt className="text-xl" />
            <span className="text-xs">Tanggal</span>
          </a>
        </li>
        <li>
          <a href="#galeri" className="flex flex-col items-center py-2">
            <IoMdPhotos className="text-xl" />
            <span className="text-xs">Galeri</span>
          </a>
        </li>
         <li>
          <a href="#lovegift" className="flex flex-col items-center py-2">
            <FaGift className="text-xl" />
            <span className="text-xs">Love Gift</span>
          </a>
        </li>
        <li>
          <a href="#ucapan" className="flex flex-col items-center py-2">
            <IoChatbubbles className="text-xl" />
            <span className="text-xs">Ucapan</span>
          </a>
        </li>    
        </ul>
      </nav>
    );
  }
  