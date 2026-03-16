import { useEffect, useMemo, useState } from 'react'
import BookForm from '../Components/BookForm.jsx'
import BookList from '../Components/BookList.jsx'

const STORAGE_KEY = 'staj-web-proje:books:v1'

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function loadBooks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

export default function LibraryPage() {
  const [books, setBooks] = useState(() => loadBooks())
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    saveBooks(books)
  }, [books])

  const mode = editing ? 'edit' : 'create'

  const stats = useMemo(() => {
    const total = books.length
    const authors = new Set(books.map((b) => b.author.toLowerCase().trim()))
    return { total, uniqueAuthors: authors.size }
  }, [books])

  function handleCreate(values) {
    const now = new Date().toISOString()
    setBooks((prev) => [
      {
        id: makeId(),
        title: values.title,
        author: values.author,
        createdAt: now,
        updatedAt: now,
      },
      ...prev,
    ])
  }

  function handleStartEdit(book) {
    setEditing(book)
  }

  function handleUpdate(values) {
    if (!editing) return
    const now = new Date().toISOString()
    setBooks((prev) =>
      prev.map((b) =>
        b.id === editing.id
          ? { ...b, title: values.title, author: values.author, updatedAt: now }
          : b,
      ),
    )
    setEditing(null)
  }

  function handleCancelEdit() {
    setEditing(null)
  }

  function handleDelete(id) {
    const book = books.find((b) => b.id === id)
    if (!book) return
    const ok = window.confirm(`"${book.title}" kitabını silmek istiyor musun?`)
    if (!ok) return
    setBooks((prev) => prev.filter((b) => b.id !== id))
    if (editing?.id === id) setEditing(null)
  }

  function handleClearAll() {
    const ok = window.confirm('Tüm kitapları silmek istiyor musun?')
    if (!ok) return
    setBooks([])
    setEditing(null)
  }

  return (
    <div className="min-h-full">
      <header className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-sm font-semibold text-emerald-600">Staj Projesi</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Kitaplık Yönetim Sistemi
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Kitap ekle, listele, güncelle ve sil. Veriler tarayıcıda{' '}
            <span className="font-semibold text-slate-900">localStorage</span>{' '}
            ile saklanır.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-md shadow-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Toplam Kitap
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {stats.total}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-md shadow-slate-200">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Benzersiz Yazar
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {stats.uniqueAuthors}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearAll}
              className="ml-auto inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              Tümünü Temizle
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200">
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
              {mode === 'edit' ? 'Kitabı Güncelle' : 'Yeni Kitap Ekle'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {mode === 'edit'
                ? 'Formu düzenleyip güncelle.'
                : 'Kitap adı ve yazar bilgisini gir.'}
            </p>
            <div className="mt-6">
              <BookForm
                mode={mode}
                initialValues={editing}
                onCancel={handleCancelEdit}
                onSubmit={mode === 'edit' ? handleUpdate : handleCreate}
              />
            </div>
          </section>

          <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
                  Liste
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Düzenlemek için “Düzenle”, silmek için “Sil”.
                </p>
              </div>
            </div>
            <BookList books={books} onEdit={handleStartEdit} onDelete={handleDelete} />
          </section>
        </div>
      </main>
    </div>
  )
}

