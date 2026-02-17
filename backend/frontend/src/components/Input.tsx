interface InputProps {
  type: string;
  placeholder?: string;
  name?: string;
  extraClass?: string;
}

const Input: React.FC<InputProps> = ({type,placeholder,name,extraClass = "",}) => {
  return (
    <input required type={type} name={name} placeholder={placeholder}
      className={`${extraClass} w-full py-3 px-4 pr-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 transition-all duration-300 focus:outline-none focus:border-[#4A9FF5] focus:ring-2 focus:ring-[#4A9FF5]/30`}
    />
  );
};

export default Input;
