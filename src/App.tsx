import './App.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {RegisterPage} from "./pages/RegisterPage";
import {RootLayout} from "./components/layout/RootLayout.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";


function App() {

    const routes = createBrowserRouter([
        {
            path: '',
            element : <RootLayout />,
            children : [
                { path: '', element: <Navigate to="/signin" replace /> },
                { path : '/signUp', element : <RegisterPage/>},
                { path : '/signIn', element : <LoginPage/>},

            ]
        },
        {
            // path: "*",
            // element: <NotFoundPage/>
        }
    ])

    return (
        <>
            <RouterProvider router={routes} />
        </>
    )
}

export default App