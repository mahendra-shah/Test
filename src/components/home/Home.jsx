import './home.css'
import { useContext } from 'react'
import Card from '../../components/cards/Card'
import blogContext from '../../context/BlogContext/BlogContext'

export default function Home() {
  const data = useContext(blogContext)

  return (
    <div className='home'>
      {data.BlogsData.map((e, i) => {
        console.log(e)
        return <Card data={e} key={i} />
      })}
      {/* Homepage */}
    </div>
  )
}
