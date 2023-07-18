import { BrowserRouter, useRoutes } from "react-router-dom";

import { ROUTES } from "./ROUTES";

import HomePage from "../screens/Home";
import LoginPage from "../screens/Login";

import Dashboard from "../screens/Dashboard";
import Main from "../screens/Main";



import UsersPage, {
  // AddUser as AddUserPage,
  ReadUser as ReadUserPage,
} from "../screens/Users";

import ClientsPage, {
  AddClient as AddClientPage,
  EditClient as EditClientPage,
  ReadClient as ReadClientPage,
} from "../screens/Clients";

import ProductsPage,{
  AddProduct as AddProductPage,
  EditProduct as EditProductPage,
  ReadProduct as ReadProductPage,
} from "../screens/Products";


import CreditsPage, {
  AddCredit as AddCreditPage,
  EditCredit as EditCreditPage,
  ReadCredit as ReadCreditPage,
} from "../screens/Credits";


import ExpensesPage,  {
  AddExpense as AddExpensePage,
  ReadExpense as ReadExpensePage,
  EditExpense as EditExpensePage
} from "../screens/Expenses";

import PaymentsPage, {
  AddPayment as AddPaymentPage,
  EditPayment as EditPaymentPage,
  ReadPayment as ReadPaymentPage
} from '../screens/Payments'



const Routess = () => {
  const routes = useRoutes([
    {
      path: ROUTES.HOME,
      element: <HomePage />,
    },
    {
      path: ROUTES.LOGIN,
      element: <LoginPage />,
    },

    {
      path: ROUTES.DASHBOARD,
      element: <Dashboard />,
      children: [
        {
          path: ROUTES.MAIN,
          element: <Main />,
        },
    {
          path: ROUTES.CLIENTS,
          element: <ClientsPage />,
          children: [
            {
              path: ROUTES.ADD_CLIENT,
              element: <AddClientPage />,
            },
            {
              path: ROUTES.EDIT_CLIENT,
              element: <EditClientPage />,
            },
            {
              path: ROUTES.READ_CLIENT,
              element: <ReadClientPage />,
            },
          ],
        },
        {
          path: ROUTES.PRODUCTS,
          element: <ProductsPage />,
          children: [
            {
              path: ROUTES.ADD_PRODUCT,
              element: <AddProductPage />,
            },
            {
              path: ROUTES.EDIT_PRODUCT,
              element: <EditProductPage />,
            },
            {
              path: ROUTES.READ_PRODUCT,
              element: <ReadProductPage />,
            },
          ],
        },
        {
          path: ROUTES.CREDITS,
          element: <CreditsPage />,
          children: [
            {
              path:ROUTES.ADD_CLIENT,
              element:<AddClientPage />
            },
            {
              path:ROUTES.ADD_PRODUCT,
              element:<AddProductPage />
            },
            {
              path: ROUTES.ADD_CREDIT,
              element: <AddCreditPage />
            },
            {
              path: ROUTES.EDIT_CREDIT,
              element: <EditCreditPage />,
            },
            {
              path: ROUTES.READ_CREDIT,
              element: <ReadCreditPage />,
            },
          ],
        },
        {
          path: ROUTES.PAYMENTS,
          element: <PaymentsPage />,
          children: [
            {
              path: ROUTES.ADD_PAYMENT,
              element: <AddPaymentPage />,
            },
            {
              path: ROUTES.EDIT_PAYMENT,
              element: <EditPaymentPage />,
            },
            {
              path: ROUTES.READ_PAYMENT,
              element: <ReadPaymentPage />,
            },
          ],
        },
        {
          path: ROUTES.USERS,
          element: <UsersPage />,
          children: [
            // {
              // path: ROUTES.ADD_USER,
              // element: <AddUserPage />,
            // },
            {
              path: ROUTES.READ_USER,
              element: <ReadUserPage />,
            },
          ],
        },
        {
          path: ROUTES.EXPENSES,
          element: <ExpensesPage />,
          children: [
            {
              path: ROUTES.ADD_EXPENSE,
              element: <AddExpensePage />,
            },
            {
              path: ROUTES.READ_EXPENSE,
              element: <ReadExpensePage />,
            },
          ],
        },

      ],
    },
  ]);

  return routes;
};

const Root = () => {
  return (
    <BrowserRouter>
      <Routess />
    </BrowserRouter>
  );
};

export default Root;