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

export const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    clearTimeout(timeoutRef.current);
    console.log("close");
    setIsOpen(false);
  };

  const openDropdown = () => {
    console.log("open");
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    },200);
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
        openDropdown,
      }}
    >
      {React.Children.map(children, (child) => {
        if (child.type.displayName === "Menu") {
          return React.cloneElement(child, { ref: dropdownRef });
        }
        return child;
      })}
    </DropdownContext.Provider>
  );
};

const Button =({
      children,
      className,
      CloseIcon = DropdownDownIcon,
      ActiveIcon = DropdownUpIcon,
      onHover = false,
    }
  ) => {
    const { toggleDropdown, isOpen, openDropdown, closeDropdown } = useDropdown();

    return (
      <button
        className={`${className} flex justify-center items-center gap-1`}
        onClick={toggleDropdown}
        onMouseEnter={() => onHover && openDropdown()}
        onMouseLeave={() => onHover && closeDropdown()}
      >
        {children}
        {isOpen ? <ActiveIcon /> : <CloseIcon />}
      </button>
    );
  }


const Menu = forwardRef(({ children, className, onValueChange },ref) => {
  const { isOpen } = useDropdown();
  return (
    isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.15 }}
        className={`${className} absolute w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
        role="menu"
        aria-orientation="vertical"
        tabIndex="-1"
        ref={ref}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { onValueChange });
          }
        })}
      </motion.div>
    )
  );
});

const Options = ({ children, className, id, onValueChange }) => {
  const { closeDropdown } = useDropdown();
  const handleClick = (e) => {
    onValueChange(e.target.id);
    closeDropdown();
  };

  return (
    <div
      className={`${className} block border border-grey-100 hover:bg-grey-100 select-none first:rounded-t-md last:rounded-b-md truncate p-2`}
      onClick={handleClick}
      id={id}
    >
      {children}
    </div>
  );
};
Menu.displayName = "Menu";
Dropdown.Button = Button;
Dropdown.Menu = Menu;
Dropdown.Options = Options;
