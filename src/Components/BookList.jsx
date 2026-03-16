import DangerButton from './DangerButton.jsx'
import SecondaryButton from './SecondaryButton.jsx'

export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
        <p className="text-slate-300">Henüz kitap yok. İlk kaydı ekleyebilirsin.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-900/60">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
                Kitap Adı
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
                Yazar
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-950/40">
            {books.map((b) => (
              <tr key={b.id} className="hover:bg-slate-900/20">
                <td className="px-4 py-3 text-sm text-slate-100">{b.title}</td>
                <td className="px-4 py-3 text-sm text-slate-200">{b.author}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <SecondaryButton onClick={() => onEdit(b)}>
                      Düzenle
                    </SecondaryButton>
                    <DangerButton onClick={() => onDelete(b.id)}>
                      Sil
                    </DangerButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

