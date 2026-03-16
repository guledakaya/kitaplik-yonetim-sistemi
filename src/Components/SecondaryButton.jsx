export default function SecondaryButton({
  children,
  onClick,
  type = 'button',
  disabled,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  )
}

