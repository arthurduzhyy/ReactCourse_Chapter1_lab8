import classNames from 'classnames'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import useValidation from '../hook/useValidation'
import { BookType } from '../type/Book'
import Title from './Title'

interface AddFormProps {
  onAdd: (book: BookType) => void
}

const AddForm: FC<AddFormProps> = ({ onAdd }) => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: ''
  })

  const { errors, validateField, validateForm } = useValidation()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm(form)) {
      const newBook = {
        id: Date.now(),
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone
      }

      onAdd(newBook)
      setForm({ first_name: '', last_name: '', phone: '' })
    }
  }

  return <>
    <Title>Add Book Form</Title>

    <form className="mt-4" onSubmit={onSubmit}>
      <div className="mb-3">
        <input
          name="first_name"
          className={classNames('form-control', { 'is-invalid': errors.first_name })}
          value={form.first_name}
          onChange={handleChange}
          placeholder="Enter new first name"
        />
        {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
      </div>

      <div className="mb-3">
        <input
          name="last_name"
          className={classNames('form-control', { 'is-invalid': errors.last_name })}
          value={form.last_name}
          onChange={handleChange}
          placeholder="Enter new last name"
        />
        {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
      </div>

      <div className="mb-3">
        <input
          name="phone"
          type="tel"
          className={classNames('form-control', { 'is-invalid': errors.phone })}
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter new phone"
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  </>
}

export default AddForm