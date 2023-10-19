import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import PostList from '../../components/PostList/PostList'
import { useSelector } from 'react-redux'

const Home = () => {
  const [postList, setPostList] = useState(null)
  const { posts } = useSelector((store) => store.rootReducer.user)

  useEffect(() => {
    setPostList(posts)
  }, [posts])

  return <>{postList && <PostList list={postList} />}</>
}

export default Home
