jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: () => {}
  })
}))

import React from 'react'
import { Navigation } from './Navigation'
import { waitFor, fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import MutationObserver from 'mutation-observer'
global.MutationObserver = MutationObserver

describe('Navigation', () => {
  describe('Drawer', () => {
    it('should open drawer', async () => {
      const wrapper = render(<Navigation routes={[['TestName', '/test-url']]}>child</Navigation>)

      fireEvent.click(await wrapper.findByTestId('toggle-nav-open'))

      await waitFor(() => {
        expect(wrapper.queryByText('TestName')).toBeVisible()
      })
    })
    it('should close drawer', async () => {
      const wrapper = render(<Navigation routes={[['TestName', '/test-url']]}>child</Navigation>)

      fireEvent.click(await wrapper.findByTestId('toggle-nav-open'))

      fireEvent.click(await wrapper.findByTestId('toggle-nav-closed'))

      await waitFor(() => {
        expect(wrapper.queryByText('TestName')).not.toBeVisible()
      })
    })
  })
})
