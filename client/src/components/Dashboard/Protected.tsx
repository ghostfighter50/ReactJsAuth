import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
    IsAuthenticated:boolean | null,
    children:any
}

const Protected:FC<Props> = ({ IsAuthenticated, children }) => {
  const Redirect = useNavigate()
  useEffect(() => {
    if (IsAuthenticated === false) {
      return Redirect('/')
    }
  })
  return children
}
export default Protected
