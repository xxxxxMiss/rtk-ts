import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchTopics } from './api'

interface TopicListState {
  list: TopicsResponse[]
  pageSize: number
  pageNum: number
}

const initialState: TopicListState = {
  list: [],
  pageNum: 1,
  pageSize: 10,
}

const fetchTopicList = createAsyncThunk('topic/fetchTopicList', fetchTopics)

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTopicList.fulfilled, (state, action) => {
      state.list = action.payload
    })
  },
})

export default topicSlice.reducer
