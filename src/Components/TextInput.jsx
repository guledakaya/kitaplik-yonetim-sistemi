export default function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoFocus,
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-200">
        {label}
      </span>
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-sky-400/30 transition focus:border-sky-500 focus:ring-4"
      />
    </label>
  )
}

