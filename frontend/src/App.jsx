import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Dashboard  from "./pages/Dashboard";

export default function App() {
    return (<Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element = {<h1>Home Page</h1>} />
        <Route path="*" element={<NotFound />} />
    </Routes>

    );
}

// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import NotFound from "./pages/NotFound";

// export default function App() {
//     return (
//         <Routes>
//             <Route path="/" element={<h1>Home Page</h1>} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="*" element={<NotFound />} />
//         </Routes>
//     );
// }

