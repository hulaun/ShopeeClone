import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  forwardRef,
} from "react";
import { DropdownDownIcon, DropdownUpIcon } from "../Icons/Icons";
import { motion } from "framer-motion";

const DropdownContext = createContext();

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};

const Dropdown = ({ children }) => {
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
      }}
    >
      {React.Children.map(children, (child) => {
        if (child.type === Button) {
          return React.cloneElement(child, { ref: dropdownRef });
        }
        return child;
      })}
    </DropdownContext.Provider>
  );
};

const Button = forwardRef(
  (
    {
      children,
      styles,
      CloseIcon = DropdownDownIcon,
      ActiveIcon = DropdownUpIcon,
      onHover = false,
    },
    ref
  ) => {
    const { toggleDropdown, isOpen } = useDropdown();

    return (
      <button
        ref={ref}
        className={`flex justify-center items-center ${styles}`}
        onClick={toggleDropdown}
        onMouseEnter={() => onHover && toggleDropdown()}
      >
        {children}
        {isOpen ? <ActiveIcon /> : <CloseIcon />}
      </button>
    );
  }
);

const Menu = ({ children, styles, value, onValueChange }) => {
  const { isOpen } = useDropdown();
  return (
    isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.15 }}
        className={`absolute mt-6 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${styles} `}
        role="menu"
        aria-orientation="vertical"
        tabIndex="-1"
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { value, onValueChange });
          }
        })}
      </motion.div>
    )
  );
};

const Options = ({ children, styles, id, value, onValueChange }) => {
  const { closeDropdown } = useDropdown();
  const handleClick = (e) => {
    onValueChange(e.target.id);
    closeDropdown();
  };

  return (
    <div
      className={`block border border-grey-100 hover:bg-grey-100 select-none first:rounded-t-md last:rounded-b-md truncate p-2 ${styles} ${
        value === id ? "bg-grey-300" : "bg-white"
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
