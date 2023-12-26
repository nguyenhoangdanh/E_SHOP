import React, { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "../../redux/actions/apiprovinces";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [userInfo, setUserInfo] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [reset, setReset] = useState(false);
  const [address, setAddress] = useState("");

  const [payload, setPayload] = useState({
    province: "",
    district: "",
    ward: "",
    address: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (userInfo === false) {
      const fetchPublicProvince = async () => {
        const response = await apiGetPublicProvinces();
        if (response.status === 200) {
          setProvinces(response?.data.results);
        }
      };
      fetchPublicProvince();
    }
  }, []);
  useEffect(() => {
    if (userInfo === false) {
      setDistrict(null);
      const fetchPublicDistrict = async () => {
        const response = await apiGetPublicDistrict(province);
        if (response.status === 200) {
          setDistricts(response.data?.results);
        }
      };
      province && fetchPublicDistrict();
      !province ? setReset(true) : setReset(false);
      !province && setDistricts([]);
    }
  }, [province]);
  useEffect(() => {
    if (userInfo === false) {
      setWard(null);
      const fetchPublicWard = async () => {
        const response = await apiGetPublicWard(district);
        if (response.status === 200) {
          setWards(response.data?.results);
        }
      };
      district && fetchPublicWard();
      !district ? setReset(true) : setReset(false);
      !district && setDistricts([]);
    }
  }, [district]);

  const paymentSubmit = () => {
    if (address === "" || province === "" || district === "" || ward === "") {
      toast.error("Vui lòng chọn địa chỉ giao hàng của bạn!");
    } else {
      const shippingAddress = {
        province,
        district,
        ward,
        address,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice1 = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  

  // this is shipping cost variable
  const shipping = subTotalPrice1 * 0.1;
  const subTotalPrice = subTotalPrice1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Mã giảm giá không hợp lệ!");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Mã giảm giá không tồn tại!");
        setCouponCode("");
      }
    });
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge)
        .toFixed(0)
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
    : (subTotalPrice + shipping)
        .toFixed(0)
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            province={province}
            setProvince={setProvince}
            district={district}
            setDistrict={setDistrict}
            ward={ward}
            setWard={setWard}
            provinces={provinces}
            setProvinces={setProvinces}
            districts={districts}
            setDistricts={setDistricts}
            wards={wards}
            setWards={setWards}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address={address}
            setAddress={setAddress}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h4 className="text-white">Tiến hành thanh toán</h4>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  userInfo,
  setUserInfo,
  province,
  setProvince,
  district,
  setDistrict,
  ward,
  setWard,
  provinces,
  setProvinces,
  districts,
  setDistricts,
  wards,
  setWards,
  address,
  setAddress,
}) => {
  const [province1, setProvince1] = useState("");
  const [district1, setDistrict1] = useState("");
  const [ward1, setWard1] = useState("");
  const [address1, setAddress1] = useState("");

  useEffect(() => {
    if (userInfo === true) {
      setProvince(province1);
      setDistrict(district1);
      setWard(ward1);
      setAddress(address1);
    }
  }, [userInfo, address1, province1, district1, ward1]);

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Địa chỉ giao hàng</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Họ tên</label>
            <input
              type="text"
              value={user && user.name}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Địa chỉ Email...</label>
            <input
              type="email"
              value={user && user.email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Số điện thoại</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Tỉnh/Thành phố</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={userInfo ? province1 : province}
              onChange={(e) =>
                userInfo
                  ? setProvince1(e.target.value)
                  : setProvince(e.target.value)
              }
            >
              <option className="block pb-2" value="">
                {userInfo ? province1 : "---Chọn tỉnh/Thành phố---"}
              </option>
              {provinces &&
                provinces.map((item) => (
                  <option key={item.province_id} value={item.province_id}>
                    {item.province_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Quận/Huyện/Thị Xã</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={userInfo ? district1 : district}
              onChange={(e) =>
                userInfo
                  ? setDistrict1(e.target.value)
                  : setDistrict(e.target.value)
              }
            >
              <option className="block pb-2" value="">
                {userInfo ? district1 : "Chọn Quận/Huyện/Thị xã"}
              </option>
              {districts &&
                districts.map((item) => (
                  <option key={item.district_id} value={item.district_id}>
                    {item.district_name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Xã/Phường/Thị trấn</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={userInfo ? ward1 : ward}
              onChange={(e) =>
                userInfo ? setWard1(e.target.value) : setWard(e.target.value)
              }
            >
              <option className="block pb-2" value="">
                {userInfo ? ward1 : "Chọn Xã/Phường/Thị trấn"}
              </option>
              {wards &&
                wards.map((item) => (
                  <option key={item.ward_id} value={item.ward_id}>
                    {item.ward_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Địa chỉ</label>
            <input
              type="text"
              value={userInfo ? address1 : address}
              onChange={(e) =>
                userInfo
                  ? setAddress1(e.target.value)
                  : setAddress(e.target.value)
              }
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5
        className="text-[18px] cursor-pointer inline-block"
        onClick={() => setUserInfo(!userInfo)}
      >
        Chọn địa chỉ đã lưu
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() => {
                    setAddress1(item.address) ||
                      setProvince1(item.province) ||
                      setDistrict1(item.district) ||
                      setWard1(item.ward);
                  }}
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Tổng:</h3>
        <h5 className="text-[18px] font-[600]">
          {subTotalPrice.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") +
            "đ"}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Phí vận chuyển:</h3>
        <h5 className="text-[18px] font-[600]">
          {shipping.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + "đ"}
        </h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Voucher:</h3>
        <h5 className="text-[18px] font-[600]">
          -{" "}
          {discountPercentenge
            ? discountPercentenge
                .toFixed(0)
                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + "đ"
            : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        {totalPrice + " đ"}
      </h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Nhập mã giảm giá"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Áp dụng"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;
