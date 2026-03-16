import DangerButton from './DangerButton.jsx'
import SecondaryButton from './SecondaryButton.jsx'

export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-md shadow-slate-200">
        <p>Henüz kitap yok. İlk kaydı ekleyebilirsin.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-md shadow-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Kitap Adı
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Yazar
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {books.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-900">{b.title}</td>
                <td className="px-4 py-3 text-sm text-slate-700">{b.author}</td>
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

