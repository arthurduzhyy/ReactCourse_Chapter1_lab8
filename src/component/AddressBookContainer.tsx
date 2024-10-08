import { useState } from 'react'
import { BookType } from '../type/Book'
import AddForm from './AddForm'
import BookTable from './BookTable'
import Layout from './Layout'
import SearchInput from './SearchInput'

const AddressBookContainer = () => {
  const [list, setList] = useState<BookType[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredList = list?.filter(t => t.first_name.toLowerCase().includes(searchQuery.toLowerCase())) || []

  const onAdd = (book: BookType) => {
    setList([book, ...list])
  }

  const onEdit = (updatedBook: BookType) => {
    setList(prev =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    )
  }

  return <Layout>
    <SearchInput query={searchQuery} onSearch={setSearchQuery} />

    <AddForm onAdd={onAdd} />

    <BookTable books={filteredList} onEdit={onEdit} />
  </Layout>
}

export default AddressBookContainer