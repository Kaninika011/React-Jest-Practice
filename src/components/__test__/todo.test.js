import {fireEvent, render, screen, cleanup} from '@testing-library/react';
import todo from '../todo';


describe("test todo component", () => {
test("should render todo component", () => {
    render(<todo/>);
    const todoElement = screen.getByTestId('todo-1');
    expect(todoElement).toBeInTheDocument;
})
})