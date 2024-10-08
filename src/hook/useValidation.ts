import { useState } from 'react'
import { BookType } from '../type/Book'

const useValidation = (initialErrors = {}) => {
  const [errors, setErrors] = useState<Record<string, string>>(initialErrors)

  const validateField = (name: string, value: string | number | undefined) => {
    let error = ''

    switch (name) {
      case 'first_name': {
        if (!value) {
          error = 'First name is required'
        }
        break
      }
      case 'last_name': {
        if (!value) {
          error = 'Last name is required'
        }
        break
      }
      case 'phone': {
        if (!value) {
          error = 'Phone number is required'
        }
        break
      }
      default:
        break
    }
    setErrors(prev => ({ ...prev, [name]: error }))
    return error
  }

  const validateForm = (form: BookType) => {
    let hasError = false
    for (const key in form) {
      const error = validateField(key, form[key as keyof BookType])
      if (error) hasError = true
    }
    return !hasError
  }

  return { errors, validateField, validateForm }
}

export default useValidation