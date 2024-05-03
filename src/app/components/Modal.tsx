import Button from "./Button";

interface ModalProps {
  header: string;
  text: string;
  onClose: () => void;
  buttonText?: string;
}
const Modal = ({ header, text, onClose, buttonText}: ModalProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center backdrop-blur-sm items-center z-20 text-foreground"
      onClick={onClose}
    >
      <div
        className={`p-6 flex flex-col justify-center items-center text-center rounded-lg shadow-lg border-2 border-border bg-card`}
      >
        <p className="text-2xl font-semibold">{header}</p>
        <p className="text-secondary_foreground pb-2">{text}</p>
        {buttonText && (<Button name={buttonText} href={""} onClick={onClose}></Button>)}
      </div>
    </div>
  );
};

export default Modal;