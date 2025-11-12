import { forwardRef } from 'react'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  text: string
  disabled?: boolean
}

// Componente Button reutilizável
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = 'submit', onClick, text, disabled }, ref) => {
    // ← submit por defeito
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="text-xs  p-2 border cursor-pointer rounded-lg shadow-lg hover:scale-105 hover:shadow-xl hover:border-amber-500 hover:text-amber-500 max-w-20 mx-auto disabled:opacity-50 disabled:cursor-not-allowed mb-1"
      >
        {text}
      </button>
    )
  }
)

export default Button
