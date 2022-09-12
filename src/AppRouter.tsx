import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Counter = lazy(() => import('~features/Counter'))
const TopicList = lazy(() => import('~features/TopicList'))

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/topics" element={<TopicList />} />
          <Route path="/couter" element={<Counter />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter
