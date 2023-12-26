/* eslint-disable jsx-a11y/aria-props */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { LoadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "../../redux/actions/apiprovinces";
import Select from "../../Address/Select";
import { updateSellerAddress } from "../../redux/actions/seller";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);

  const dispatch = useDispatch();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [id, setId] = useState("");
  const [province, setProvince] = useState(seller && seller.addresses[0].province ? seller.addresses[0].province :"");
  const [district, setDistrict] = useState(seller && seller.addresses[0].district ? seller.addresses[0].district :"");
  const [ward, setWard] = useState(seller && seller.addresses[0].ward ? seller.addresses[0].ward :"");
  const [reset, setReset] = useState(false);

  const [payload, setPayload] = useState({
    province: "",
    district: "",
    ward: "",
    address: "",
  });

  const handleImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    await axios
      .put(`${server}/shop/update-shop-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(LoadSeller());
        toast.success("Avatar updated successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    // console.log("payload", payload);
    // if (province === "" || district === "" || ward === "") {
    //   toast.error("Please fill all the fields!");
    // } else {
      dispatch(
        updateSellerAddress(
          name,
          phoneNumber,
          description,
          payload.province,
          payload.district,
          payload.ward,
          address
        )
      );
    //   // setProvince("");
    //   // setDistrict("");
    //   // setWard("");
    //   // setAddress("");
    // }
  };

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
    if(seller.addresses[0].province){
      const a = provinces?.find((item) => item.province_name === province)?.province_id;
      setProvince(a)
    }
  }, []);

  useEffect(() => {
    setDistrict(null);
    console.log('a', province)
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
    // if(seller.addresses[0].district){
    //   const a = districts?.find((item) => item.province_name === province)?.province_id;
    //   setDistrict(a)
    // }
  }, [province]);

  useEffect(() => {
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
  }, [district]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${
        ward
          ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},`
          : ""
      } ${
        district
          ? `${
              districts?.find((item) => item.district_id === district)
                ?.district_name
            },`
          : ""
      } ${
        province
          ? provinces?.find((item) => item.province_id === province)
              ?.province_name
          : ""
      }`,
      province: seller.addresses[0].province ? seller.addresses[0].province :
     (province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : ""),
      district: seller.addresses[0].district ? seller.addresses[0].district :
      (district
        ? districts?.find((item) => item.district_id === district)
            ?.district_name
        : ""),
      ward: seller.addresses[0].ward ? seller.addresses[0].ward :
      (ward ? wards?.find((item) => item.ward_id === ward)?.ward_name : ""),
    }));
  }, [province, district, ward]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
       <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-[20%] flex items-center right-[280px]">
          <div className="relative">
            <img
              src={avatar ? avatar : `${backend_url}/${seller.avatar}`}
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

       
       <form
          aria-aria-required={true}
          className="flex flex-col items-center absolute w-[70%] left-[380px] top-[150px]"
          onSubmit={updateHandler}
        >
          <div className="w-[80%] flex-col items-center 800px:w-[50%] mt-5">
            <div className="w-[40%] flex-col items-center bg-gray-200">
              <label className="block pb-2 font-bold">Tên cửa hàng</label>
            </div>
            <input
              type="name"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none border border-gray-300 p-2 rounded-md w-full"
              // className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[80%] items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-[40%] flex-col items-center bg-gray-200">
              <label className="block pb-2 font-bold">Hotline</label>
            </div>
            <input
              type="number"
              placeholder={seller?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="outline-none border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>
          <div className="w-[100%] items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-[40%] flex-col items-center bg-gray-200">
              <label className="block pb-2 font-bold">Giới thiệu </label>
            </div>
            <input
              type="name"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="outline-none border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          <div className="w-[100%] items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-[40%] flex-col items-center bg-gray-200">
              <label className="block pb-2 font-bold">Tỉnh/Thành Phố</label>
            </div>
            <div className="w-full pb-2">
              <Select
                type="province"
                value={province}
                setValue={setProvince}
                options={provinces}
                label={
                  seller && seller.addresses[0].province
                    ? (seller.addresses[0].province ? seller.addresses[0].province : "---Chưa cập nhật---")
                    : "---Chọn Tỉnh/Thành phố---"
                }
              />
            </div>
          </div>

          <div className="w-[100%] items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-[40%] flex-col items-center bg-gray-200">
              <label className="block pb-2 font-bold">Thành Phố/Huyện/Thị Xã</label>
            </div>
            <div className="w-full pb-2">
              <Select
                reset={reset}
                type="district"
                value={district}
                setValue={setDistrict}
                options={districts}
                label={
                  seller && seller.addresses[0]
                    ? (seller.addresses[0].district ? seller.addresses[0].district : "---Chưa cập nhật---")
                    : "---Chọn Quận/Huyện---"
                }
              />
            </div>
          </div>

          <div className="w-[100%] items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-[40%] flex-col items-center bg-gray-200">
              <label className="block pb-2 font-bold">Xã/Phường/Thị Trấn</label>
            </div>
            <div className="w-full pb-2">
              <Select
                reset={reset}
                type="ward"
                value={ward}
                setValue={setWard}
                options={wards}
                label={
                  seller && seller.addresses[0]
                    ? (seller.addresses[0].ward ? seller.addresses[0].ward : "---Chưa cập nhật---")
                    : "---Chọn Xã/Phường/Thị trấn---"
                }
              />
            </div>
          </div>

          <div className="w-[100%] items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-[40%] flex-col items-center  bg-gray-200">
              <label className="block pb-2 font-bold">Địa chỉ</label>
            </div>
            <input
              type="name"
              placeholder={seller && seller.addresses[0]
                ? seller.addresses[0].address
                :"Địa chỉ..."}
              value={
                 address
              }
              onChange={(e) => setAddress(e.target.value)}
              className="outline-none border border-gray-300 p-2 rounded-md w-full"
            />
          </div>

          <div className="w-[80%] flex items-center flex-col 800px:w-[50%] mt-5">
            <button
              type="submit"
              value="Update Shop"
              className={`${styles.button} !w-[95%] mb-4 800px:mb-0`}
              required
              readOnly
            >
              <h3 className="text-[#fff] flex items-center font-bold">
              Cập nhật
              </h3>
              </button>
          </div>
        </form>
       </div>
      
    </div>
  );
};

export default ShopSettings;
