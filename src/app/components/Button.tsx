interface ButtonProps {
  name?: string;
  href?: string;
  bg?: string;
  onClick?: () => void;
}

const Button = ({ name, href, bg, onClick }: ButtonProps) => {
  return (
    <button
      className={`rounded-lg px-2 py-1 ${bg} hover:bg-primary_hover ml-1 text-primary_foreground`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
