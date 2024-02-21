import {fireEvent, render, screen} from '@testing-library/react';
import Login, { validateEmail } from '../Login';
import userEvent from '@testing-library/user-event';
 


describe("test the login component", () => {
    test("render the login form with two buttons", async () => {
        render(<Login/>)
        const buttonList = await screen.findAllByRole("button");
        expect (buttonList).toHaveLength(2);
    });
    test("should fail on email validation", () => {
      const testEmail = "kaninika";
      expect(validateEmail(testEmail)).not.toBe(true)
    })
    test("should only accept email", async () => {
        render(<Login/>);
        const email = await screen.findAllByPlaceholderText("Enter email");
        userEvent.type(email, "kaninika");
        expect(email.value).not.toBe("kaninikasc@gmail.com");
    })
    test("password input must have type password", async () => {
        render(<Login/>);
        const password = await screen.findByPlaceholderText("Password");
        expect(password).toHaveAttribute("type","password");
    });
    test("should be able to reset the form", async () => {
        render(<Login />);
        const resetBtn = screen.getByTestId("reset");
        const emailInputNode = await screen.findByPlaceholderText("Enter email");
        const passwordInputNode = await screen.findByPlaceholderText("Password");
    
        fireEvent.change(emailInputNode, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInputNode, { target: { value: "password123" } });
        fireEvent.click(resetBtn);
    
        expect(emailInputNode.value).toBe("");
        expect(passwordInputNode.value).toBe("");
      });
      test("should be able to submit the form", async () => {
        render(<Login />);
        const submitBtn = screen.getByTestId("submit");
        const emailInputNode = await screen.findByPlaceholderText("Enter email");
        const passwordInputNode = await screen.findByPlaceholderText("Password");
    
        fireEvent.change(emailInputNode, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInputNode, { target: { value: "password123" } });
        fireEvent.click(submitBtn);
          const userInfo = screen. getByText("test@example.com")
          expect(userInfo).toBeInTheDocument;
       
      });
      test("should display error if incorrect email address", async () => {
        render(<Login />);
        const submitBtn = screen.getByTestId("submit");
        const emailInputNode = await screen.findByPlaceholderText("Enter email");
        const passwordInputNode = await screen.findByPlaceholderText("Password");
    
        fireEvent.change(emailInputNode, { target: { value: "test" } });
        fireEvent.change(passwordInputNode, { target: { value: "password123" } });
        fireEvent.click(submitBtn);
          const errorMessage = screen.getByText("Email is not valid");
          expect(errorMessage).toBeInTheDocument;
       
      });
})