import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import { AuthContext, AuthContextValue } from "../context/AuthContext";


function renderWithAuth(value: AuthContextValue) {
  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

test("shows error when login fails", async () => {
  const authValue: AuthContextValue = {
    token: null,
    isAuthenticated: false,
    loading: false,
    login: async () => "Mot de passe invalide",
    logout: async () => {},
  };

  const { getByLabelText, getByRole, getByText } = renderWithAuth(authValue);

  fireEvent.change(getByLabelText("Mot de passe"), {
    target: { value: "wrong" },
  });
  fireEvent.click(getByRole("button", { name: "Se connecter" }));

  await waitFor(() => {
    expect(getByText("Mot de passe invalide")).toBeInTheDocument();
  });
});

test("does not show form when authenticated", () => {
  const authValue: AuthContextValue = {
    token: "token",
    isAuthenticated: true,
    loading: false,
    login: async () => null,
    logout: async () => {},
  };

  const { queryByText } = renderWithAuth(authValue);
  expect(queryByText("Connexion Admin")).not.toBeInTheDocument();
});
