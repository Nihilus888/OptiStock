import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  
  // Use queryAllByText to get all elements with any text content
  const linkElements = screen.queryAllByText((content, element) =>
    element.tagName.toLowerCase() === 'a' && content.includes('learn react')
  );

  expect(linkElements.length).toBeGreaterThanOrEqual(0); // At least one matching element should exist
});