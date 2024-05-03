"use client";
import { BsQuestionCircle } from "react-icons/bs";
import ThemeToggle from "./ThemeToggle";
import Modal from "./Modal";
import { useState } from "react";

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="fixed flex justify-center w-full">
      {isModalOpen && (
        <Modal
          header={"About"}
          text={
            "Enter a disc you like and get recommendations for discs with similar flight numbers"
          }
          onClose={handleCloseModal}
        ></Modal>
      )}
      <div className="bg-primary rounded-full flex flex-row text-center items-center p-2 mt-2 border border-border shadow">
        <p className="text-foreground font-bold">Similar Disc</p>
        <a href="#" className="ml-2 hover:text-primary/80 p-1" onClick={()=>setIsModalOpen(true)}>
          <BsQuestionCircle size={20} />
        </a>
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
};

export default NavBar;
