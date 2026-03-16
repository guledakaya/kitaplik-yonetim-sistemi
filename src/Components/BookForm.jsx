import { useEffect, useMemo, useState } from 'react'
import PrimaryButton from './PrimaryButton.jsx'
import SecondaryButton from './SecondaryButton.jsx'
import TextInput from './TextInput.jsx'

export default function BookForm({ mode, initialValues, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [author, setAuthor] = useState(initialValues?.author ?? '')
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    setTitle(initialValues?.title ?? '')
    setAuthor(initialValues?.author ?? '')
    setTouched(false)
  }, [initialValues?.title, initialValues?.author])

  const errors = useMemo(() => {
    const next = {}
    if (!title.trim()) next.title = 'Kitap adı zorunlu.'
    if (!author.trim()) next.author = 'Yazar zorunlu.'
    return next
  }, [title, author])

  const isValid = Object.keys(errors).length === 0

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (!isValid) return
    onSubmit({ title: title.trim(), author: author.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <TextInput
            id="title"
            label="Kitap Adı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn: Simyacı"
            autoFocus
          />
          {touched && errors.title ? (
            <p className="mt-1 text-sm text-rose-500">{errors.title}</p>
          ) : null}
        </div>

        <div>
          <TextInput
            id="author"
            label="Yazar"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Örn: Paulo Coelho"
          />
          {touched && errors.author ? (
            <p className="mt-1 text-sm text-rose-500">{errors.author}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <PrimaryButton type="submit">
          {mode === 'edit' ? 'Güncelle' : 'Ekle'}
        </PrimaryButton>
        {mode === 'edit' ? (
          <SecondaryButton type="button" onClick={onCancel}>
            Vazgeç
          </SecondaryButton>
        ) : null}
        <p className="text-sm text-slate-500">
          {mode === 'edit'
            ? 'Seçili kaydı düzenliyorsun.'
            : 'Yeni kitap ekle.'}
        </p>
      </div>
    </form>
  )
}

