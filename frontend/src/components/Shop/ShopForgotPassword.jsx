import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../../styles/styles'
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../../server';

const ShopForgotPassword = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/shop/shop-forgot-password`,
        {
          email,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        // window.location.reload();
        navigate("/shop-login");
        // setTimeout(function(){window.location.reload(true);},100)
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="area flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="relative">
        {/* <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"> */}
        <div className= "ml-[580px] sm:rounded-full w-[320px] h-[60px] flex justify-center py-2 px-4 ">
            <h2 className="text-center animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-4xl font-black">
              Quên Mật Khẩu
            </h2>
          </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
          
          <div className="bg-gradient-to-r from-teal-500 via-teal-500 to-emerald-500 py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
           
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative group">
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-4 text-sm peer bg-gray-100 outline-none"
                  />
                  <label
                    htmlFor="email"
                    className="transform transition-all absolute top-0 left-0 h-full flex items-center pl-2 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0"
                  >
                    Địa chỉ Email...
                  </label>
                </div>
              </div>

              <div>
                <button className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
                  {/* <button className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"> */}
                  Gửi
                </button>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Bạn đã có cửa hàng?</h4>
                <Link to="/login" className="text-amber-400 underline font-medium pl-2">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default ShopForgotPassword
