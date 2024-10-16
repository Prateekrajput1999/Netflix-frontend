import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Movies from "./components/Movies";
import Movie from "./components/Movie";
import { useAuth } from "./components/AuthContext";
import "./App.css";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/movies" replace />
            ) : (
              <Signup initialType="login" />
            )
          }
        />
        <Route
          path="/movies"
          element={isAuthenticated ? <Movies /> : <Navigate to="/" replace />}
        />
        <Route
          path="/movies/:id"
          element={isAuthenticated ? <Movie /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
