import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Signup from "../pages/users/Signup";

// Mock signupUser API
jest.mock("http://localhost:5173/signup", () => ({
    signupUser: jest.fn(),
}));

import { signupUser } from "http://localhost:3008/signup";

describe("Signup Component", () => {
    let setCurrUser;

    beforeEach(() => {
        setCurrUser = jest.fn();
        signupUser.mockClear();
    });

    const setup = () =>
        render(
            <MemoryRouter>
                <Signup setCurrUser={setCurrUser} />
            </MemoryRouter>
        );

    test("renders all form fields", () => {
        setup();
        expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Agree to terms and conditions/i)).toBeInTheDocument();
    });

    test("shows validation errors when fields are empty", async () => {
        setup();
        fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));
        expect(await screen.findByText("Username is required.")).toBeInTheDocument();
        expect(await screen.findByText("Email is required.")).toBeInTheDocument();
        expect(await screen.findByText("Password is required.")).toBeInTheDocument();
        expect(await screen.findByText("You must agree to terms.")).toBeInTheDocument();
    });

    test("submits form when valid", async () => {
        signupUser.mockResolvedValueOnce({ id: 1, username: "testuser" });

        setup();

        userEvent.type(screen.getByLabelText(/Username:/i), "testuser");
        userEvent.type(screen.getByLabelText(/Email:/i), "test@example.com");
        userEvent.type(screen.getByLabelText(/Password:/i), "password123");
        userEvent.click(screen.getByLabelText(/Agree to terms/i));

        fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

        await waitFor(() => {
            expect(signupUser).toHaveBeenCalledWith({
                username: "testuser",
                email: "test@example.com",
                password: "password123",
            });
            expect(setCurrUser).toHaveBeenCalledWith({ id: 1, username: "testuser" });
        });
    });

    test("shows server error message", async () => {
        signupUser.mockRejectedValueOnce({
            response: { data: { message: "Email already exists" } },
        });

        setup();

        userEvent.type(screen.getByLabelText(/Username:/i), "testuser");
        userEvent.type(screen.getByLabelText(/Email:/i), "test@example.com");
        userEvent.type(screen.getByLabelText(/Password:/i), "password123");
        userEvent.click(screen.getByLabelText(/Agree to terms/i));

        fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

        expect(await screen.findByText(/Email already exists/i)).toBeInTheDocument();
    });
});
