import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with react testing tutorial in the document', () => {
  render(<App />);
  const linkElement = screen.getByText(/This is React Testing Tutorial/i);
  expect(linkElement).toBeInTheDocument();
});

test('render login component in the document', () => {
  const component = render(<App/>)
  const childElement = component.getAllByLabelText("Email");
  expect(childElement).toBeTruthy();
})