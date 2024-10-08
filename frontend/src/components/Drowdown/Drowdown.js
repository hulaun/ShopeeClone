import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { DropdownDownIcon, DropdownUpIcon } from "../Icons/Icons";

const DropdownContext = createContext();

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};

const Dropdown = ({ children }) => {
  const [choseOption, setChoseOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        toggleDropdown,
        closeDropdown,
        dropdownRef,
        choseOption,
        setChoseOption,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

const Button = ({
  children,
  styles,
  CloseIcon = DropdownDownIcon,
  ActiveIcon = DropdownUpIcon,
}) => {
  const { toggleDropdown, isOpen } = useDropdown();

  return (
    <button
      className={`flex justify-center items-center ${styles}`}
      onClick={toggleDropdown}
    >
      {children}
      {isOpen ? <ActiveIcon /> : <CloseIcon />}
    </button>
  );
};

const Menu = ({ children, styles }) => {
  const { isOpen, dropdownRef } = useDropdown();

  return (
    isOpen && (
      <div
        ref={dropdownRef}
        className={`absolute mt-6 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${styles}`}
        role="menu"
        aria-orientation="vertical"
        tabIndex="-1"
      >
        {children}
      </div>
    )
  );
};

const Options = ({ children, styles, id }) => {
  const { closeDropdown, setChoseOption, choseOption } = useDropdown();
  const handleClick = (e) => {
    setChoseOption(e.target.id);
    closeDropdown();
  };

  return (
    <div
      className={`block border border-grey-100 hover:bg-gray-700 truncate p-2 ${styles} ${
        choseOption === id ? "bg-grey-300" : "bg-white"
      }`}
      onClick={handleClick}
      id={id}
    >
      {children}
    </div>
  );
};

Dropdown.Button = Button;
Dropdown.Menu = Menu;
Dropdown.Options = Options;

export default Dropdown;
