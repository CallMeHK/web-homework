import React from 'react'
import renderer from 'react-test-renderer'
import AppRouter from './routes'

describe('routes', () => {
  describe('Routes', () => {
    it('should render correctly', () => {
      const tree = renderer.create(<AppRouter />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
