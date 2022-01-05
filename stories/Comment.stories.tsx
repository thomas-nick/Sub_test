import { Meta } from '@storybook/react'
import Comments from '../src/components/common/comments/Comments'
import Comment from '../src/components/common/comments/Comment'
import NewComment from '../src/components/common/comments/NewComment'
import { Box } from '@mui/system'
import { Provider } from 'react-redux'
import React from 'react'
import { initializeStore } from '../src/rtk/app/store'

const store = initializeStore()

export default {
    component: Comments,
    title: 'Comments/Comments',
    decorators: [
        Story => (
            <Provider store={store}>
                <Story />
            </Provider>
        )
    ],
} as Meta

const postId = '22940';
const commentId = '22941';

export const CommentsList = () => <Comments
    countOfComments={1}
    parentId={postId}/>

export const CommentItem = () =>
    <Box sx={{p: 2}}>
        <Comment
            commentId={commentId}
        />
    </Box>


export const CommentInput = () => <Box sx={{p: 2}}><NewComment placeholder={'Add a comment'}/></Box>

