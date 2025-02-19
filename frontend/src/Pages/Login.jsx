import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Login = () => {
  return (
    <div>
      <div className="p-10">
        <h1 className="text-3xl font-bold">Login</h1>
        <input type="text" placeholder="Username" className="border p-2 m-2" />
        <input type="password" placeholder="Password" className="border p-2 m-2" />
        <button className="bg-blue-500 text-white px-4 py-2">Login</button>
      </div>
    </div>
  );
};

export default Login;

