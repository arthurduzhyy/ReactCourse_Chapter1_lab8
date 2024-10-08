import { FC } from 'react'

interface SearchInputProps {
  query: string
  onSearch: (value: string) => void
}

const SearchInput: FC<SearchInputProps> = ({ query, onSearch }) => {
  return <input
    className="form-control"
    value={query}
    onChange={e => onSearch(e.target.value)}
    placeholder="Search books..."
  />
}

export default SearchInput