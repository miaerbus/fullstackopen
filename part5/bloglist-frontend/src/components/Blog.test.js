import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
  }

  const component = render(<Blog blog={blog} />)

  const titleAndAuthor = component.container.querySelector('.title-author')
  const likes = component.container.querySelector('.likes')
  const url = component.container.querySelector('.url')

  expect(titleAndAuthor).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(titleAndAuthor).toHaveTextContent('John Doe')
  expect(titleAndAuthor).toHaveClass('title-author')
  expect(likes).toBeNull()
  expect(url).toBeNull()
})

test('clicking the button shows the blogs url and number of likes', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jane Doe',
    likes: 0,
    url: 'http://google.com',
  }

  const component = render(<Blog blog={blog} />)
  const button = component.getByText('view')
  const likes = component.container.querySelector('.likes')
  const url = component.container.querySelector('.url')
  expect(likes).toBeNull()
  expect(url).toBeNull()

  fireEvent.click(button)

  expect(likes).toBeDefined()
  expect(url).toBeDefined()
})

test('clicking the like button twice the event handler is called twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jane Doe',
    likes: 0,
    url: 'http://google.com',
  }

  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} handleLikeChange={mockHandler} />)
  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
