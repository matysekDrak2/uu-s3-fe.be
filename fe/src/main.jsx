import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserProvider from "./components/providers/userProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingList from "./components/shoppingList/shoppingList.jsx";
import DataProvider from "./components/providers/dataProvider.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import ConfirmationProvider from "./components/providers/confirmationProvider.jsx";



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <DataProvider>
          <UserProvider>
              <ConfirmationProvider>
                  <BrowserRouter>
                      <Routes>
                          <Route path="/" element={<Dashboard/>}/>
                          <Route path="/list/:id" element={<ShoppingList/>}/>
                      </Routes>
                  </BrowserRouter>
              </ConfirmationProvider>
          </UserProvider>
      </DataProvider>
  </StrictMode>,
)
