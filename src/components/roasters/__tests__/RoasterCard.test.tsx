import { render, screen } from '@testing-library/react'
import { RoasterCard } from '../RoasterCard'

describe('RoasterCard', () => {
  const mockRoaster = {
    id: '1',
    name: 'Test Roaster',
    slug: 'test-roaster',
    description: 'A test roaster',
    address: '123 Test St',
    city: 'Portland',
    state: 'OR',
    zipCode: '97214',
    website: 'https://test.com',
    roastingStyles: ['Light', 'Medium'],
    beanOrigins: ['Ethiopia', 'Colombia'],
    clickCount: 0,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    latitude: null,
    longitude: null,
    phone: null,
    email: null
  }

  it('renders roaster information correctly', () => {
    render(<RoasterCard roaster={mockRoaster} />)
    
    expect(screen.getByText('Test Roaster')).toBeInTheDocument()
    expect(screen.getByText('Portland, OR')).toBeInTheDocument()
    expect(screen.getByText('A test roaster')).toBeInTheDocument()
  })

  it('renders roasting styles correctly', () => {
    render(<RoasterCard roaster={mockRoaster} />)
    
    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
  })
})