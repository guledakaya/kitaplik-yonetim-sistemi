export default function DangerButton({ children, onClick, type = 'button', disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-rose-300/40 transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  )
}

