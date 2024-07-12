import { ComponentProps } from "react";

interface LabelInputProps extends ComponentProps<'input'> {
  icon: React.ReactNode;
}
export function LabelInput({placeholder, name, icon, ...props}: LabelInputProps) {
  return (
    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
      {icon}
      <label htmlFor={name} className="sr-only">{placeholder}</label>
      <input
        {...props}
        name={name}
        id={name}
        placeholder={placeholder}
        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
    </div>
  )
}