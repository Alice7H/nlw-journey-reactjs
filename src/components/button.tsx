import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: "flex items-center justify-center gap-2 rounded-lg px-5 font-medium hover:underline",
  variants: {
    variant: {
      primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
      secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
    },
    size: {
      default: 'py-2',
      full: 'w-full h-11',
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants>{}

export function Button({variant, size, children, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({variant: variant, size: size})}>
      {children}
    </button>
  )
}