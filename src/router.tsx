import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Home } from './pages/home';

const router = createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path:"/",
                element:<Home/>
                
            }
        ]
    }

]);


export { router };
