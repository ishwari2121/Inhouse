import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Signup = () => {
  return (
    <div>
      <div className="p-10">
        <h1 className="text-3xl font-bold">Signup</h1>
        <input type="text" placeholder="Username" className="border p-2 m-2" />
        <input type="email" placeholder="Email" className="border p-2 m-2" />
        <input type="password" placeholder="Password" className="border p-2 m-2" />
        <button className="bg-green-500 text-white px-4 py-2">Signup</button>
      </div>
    </div>
  );
};

export default Signup;

