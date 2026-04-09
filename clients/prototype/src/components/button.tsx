import * as React from "react";

type ButtonProps = {
  onPress    : () => void,
  title      : string,
  disabled  ?: boolean,
  style     ?: 'full' | 'outline' | 'text',
  theme     ?: 'primary' | 'secondary' | 'error' | 'success' | 'warning',
  className ?: string,
}

const themeClasses: Record<NonNullable<ButtonProps['theme']>, string> = {
  primary  : 'bg-violet-600 text-white hover:bg-violet-700 focus-visible:ring-violet-500 disabled:bg-gray-400 disabled:text-gray-100',
  secondary: 'bg-slate-800 text-white hover:bg-slate-900 focus-visible:ring-slate-500 disabled:bg-gray-400 disabled:text-gray-100',
  error    : 'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500 disabled:bg-gray-400 disabled:text-gray-100',
  success  : 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500 disabled:bg-gray-400 disabled:text-gray-100',
  warning  : 'bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-500 disabled:bg-gray-400 disabled:text-gray-100',
}

const styleClasses: Record<NonNullable<ButtonProps['style']>, string> = {
  full   : 'w-full justify-center px-4 py-3 rounded-xl shadow-sm',
  outline: 'border bg-transparent px-4 py-3 rounded-xl',
  text   : 'bg-transparent px-2 py-1 rounded-lg shadow-none hover:bg-black/5 dark:hover:bg-white/10',
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  disabled = false,
  style = 'full',
  theme = 'primary',
  className = ''
}: ButtonProps ) =>
{
  const baseClasses =
    'inline-flex items-center font-medium transition-colors duration-200 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
    'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'

  const resolvedStyleClasses = styleClasses[style]
  const resolvedThemeClasses =
    style === 'outline'
      ? 'border-violet-500 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-500/10 focus-visible:ring-violet-500 disabled:border-gray-400 disabled:text-gray-500 disabled:hover:bg-transparent'
      : themeClasses[theme]

  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      className={`${baseClasses} ${resolvedStyleClasses} ${resolvedThemeClasses} ${className}`}
    >
      {title}
    </button>
  )
}