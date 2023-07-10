import './button.scss'
import { ReactNode } from 'react'
interface ButtonProps {
  onClick?: () => void,
  disabled?: boolean,
  className: string,
  children: ReactNode,
  type?: string,
}
export const Button: React.FC<ButtonProps> =
  ({ onClick, disabled, className, children, }: ButtonProps) => (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )


