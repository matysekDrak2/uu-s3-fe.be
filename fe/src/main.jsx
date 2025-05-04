import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserProvider from "./components/user/userProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./components/list/list.jsx";
import DataProvider from "./components/providers/dataProvider.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import ConfirmationProvider from "./components/providers/confirmationProvider.jsx";
import MockProvider from "./components/providers/mockProvider.jsx";



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <MockProvider>
          <UserProvider>
              <DataProvider>
                  <ConfirmationProvider>
                      <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/list/:id" element={<List />} />
                            </Routes>
                      </BrowserRouter>
                  </ConfirmationProvider>
              </DataProvider>
          </UserProvider>
      </MockProvider>
  </StrictMode>
)
