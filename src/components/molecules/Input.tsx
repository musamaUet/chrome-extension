import { Image } from "@/components/atoms";
import INPUT_KEY from "@/assets/images/key.svg";
import { AddProfileButton } from "@/components/svg-icons";

interface IAddProfileInputProps {
  name: string;
  className?: string;
  value: string | number | string[] | undefined;
  type?:
  | "text"
  | "email"
  | "tel"
  | "number"
  | "password"
  | "search"
  | "file"
  | "url";
  placeholder: string;
  handleSubmit?: () => void;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  type,
  value,
  onChange,
  className,
  placeholder,
  handleSubmit,
  ...props
}: IAddProfileInputProps) {
  return (
    <div className={`input w-[80%] ${className}`.trim()}>
      <div className="input__inner w-full flex items-center relative bg-transparent border-[0.5px] border-gray-400 py-[1px] pl-[14px] pr-[20px] rounded-8 outline-none focus:outline-none">
        <Image src={INPUT_KEY} alt="" width={18} />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input__input-field h-xl w-full text-[14px] text-white bg-transparent pl-[8px] outline-none focus:outline-none"
          {...props}
        />

        {placeholder === "Password" && (
          <div
            className="input__button absolute top-1/2 -translate-y-[44%] right-[5px] cursor-pointer"
            onClick={handleSubmit}
          >
            <AddProfileButton />
          </div>
        )}
      </div>
    </div>
  );
}
