import React from 'react';
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

vi.mock('./supabaseClient', () => ({
  supabase: {
    from: () => ({
      insert: () => Promise.resolve({ error: null }),
    }),
  },
}))

describe('App component', () => {
  it('renders the SAKURA logo', () => {
    render(<App />)
    expect(screen.getByText(/SAKURA/i)).toBeInTheDocument()
  })

  it('shows category buttons', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /🍣 Роли/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /🍱 Сети/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /🥤 Напої/ })).toBeInTheDocument()
  })
  it('displays products from default category (Роли)', () => {
    render(<App />)
    expect(screen.getByText(/Рол Філадельфія/)).toBeInTheDocument()
  })

  it('adds to cart when "Купити" clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    const buyButtons = screen.getAllByText(/Купити/)
    await user.click(buyButtons[0])
    expect(screen.getByText(/Кошик \(1\)/)).toBeInTheDocument()
  })
})
