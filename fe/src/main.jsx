import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Col, Row} from "react-bootstrap";
import UserProvider from "./components/providers/user_provider.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingList from "./components/shoppingList/shoppingList.jsx";
import DataProvider from "./components/providers/dataProvider.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <DataProvider>
          <UserProvider>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<Dashboard/>}/>
                      <Route path="/list/:id" element={<ShoppingList/>}/>
                  </Routes>
              </BrowserRouter>
          </UserProvider>
      </DataProvider>
  </StrictMode>,
)
