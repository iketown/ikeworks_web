import React, { useRef } from "react";
import { Transition } from "@headlessui/react";
import useClickOutside from "use-click-outside";

interface DropdownI {
  menuOpen: boolean;
  onClose: () => void;
  position: "right" | "left";
}

const Dropdown: React.FC<DropdownI> = ({
  menuOpen,
  onClose = () => {
    console.log("CLOSED");
  },
  children,
  position = "right",
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, onClose);
  let positionClass = "";

  switch (position) {
    case "right":
      positionClass = "origin-top-left left-0";
      break;
    case "left":
      positionClass = "origin-top-right right-0";
      break;
  }
  return (
    <div ref={menuRef}>
      <Transition
        show={menuOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {(ref) => {
          return (
            <div
              ref={(r) => {
                ref.current = r;
                // menuRef.current = r;
              }}
              className={`${positionClass} absolute  mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              {children}
            </div>
          );
        }}
      </Transition>
    </div>
  );
};

export default Dropdown;
