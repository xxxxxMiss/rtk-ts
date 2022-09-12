import { Pagination, Typography } from 'antd'
import { useSelector } from 'react-redux'

const { Paragraph, Link } = Typography

const TopicList = () => {
  useSelector(state => {
    console.log('-------state', state)
  })
  return (
    <>
      <Paragraph>
        <ul>
          {/* {list.map(item => (
            <li key={item.id}>
              <Link href="/docs/spec/overview">{item.title}</Link>
            </li>
          ))} */}
        </ul>
      </Paragraph>
      <Pagination />
    </>
  )
}

export default TopicList
