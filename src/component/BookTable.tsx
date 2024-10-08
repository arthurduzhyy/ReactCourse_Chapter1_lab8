import { ChangeEvent, FC, useState } from 'react'
import useValidation from '../hook/useValidation'
import { BookType } from '../type/Book'
import Title from './Title'

interface BookTableProps {
  books: BookType[]
  onEdit: (book: BookType) => void
}

const BookTable: FC<BookTableProps> = ({ books, onEdit }) => {
  const [editingBookId, setEditingBookId] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<BookType>>({})

  const { errors, validateField } = useValidation()

  const startEditing = (book: BookType) => {
    setEditingBookId(book.id!)
    setForm(book)
  }

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const saveChanges = () => {
    if (form.id !== undefined && form.first_name && form.last_name && form.phone) {
      onEdit(form as BookType)
      setEditingBookId(null)
    }
  }

  return <>
    <Title>Book Table</Title>

    <table className="table mt-4">
      <thead>
      <tr>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Phone</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      {books.map((book) => (
        <tr key={book.id}>
          {editingBookId === book.id ? <>
            <td>
              <input
                className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                name="first_name"
                value={form.first_name ?? ''}
                onChange={handleEditChange}
              />
              {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
            </td>
            <td>
              <input
                className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                name="last_name"
                value={form.last_name ?? ''}
                onChange={handleEditChange}
              />
              {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
            </td>
            <td>
              <input
                type="tel"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                name="phone"
                value={form.phone ?? ''}
                onChange={handleEditChange}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </td>
            <td>
              <button className="btn btn-success" onClick={saveChanges}>
                Save
              </button>
            </td>
          </> : <>
            <td>{book.first_name}</td>
            <td>{book.last_name}</td>
            <td>{book.phone}</td>
            <td>
              <button className="btn btn-primary" onClick={() => startEditing(book)}>
                Edit
              </button>
            </td>
          </>}
        </tr>
      ))}
      </tbody>
    </table>
  </>
}

export default BookTable