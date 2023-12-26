import React, { useEffect, useState } from 'react';

import { apiGetPublicProvinces, apiGetPublicDistrict, apiGetPublicWard } from '../redux/actions/apiprovinces'
import Select from './Select';
import InputReadOnly from './InputReadOnly';
const VietNameseProvinces = () => {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')
  const [reset, setReset] = useState(false)

  useEffect(() => {
      const fetchPublicProvince = async () => {
          const response = await apiGetPublicProvinces()
          if (response.status === 200) {
              setProvinces(response?.data.results)
          }
      }
      fetchPublicProvince()
  }, [])
  useEffect(() => {
      setDistrict(null)
      const fetchPublicDistrict = async () => {
          const response = await apiGetPublicDistrict(province)
          if (response.status === 200) {
              setDistricts(response.data?.results)
          }
      }
      province && fetchPublicDistrict()
      !province ? setReset(true) : setReset(false)
      !province && setDistricts([])
  }, [province])
  useEffect(() => {
    setWard(null)
    console.log("ok")
    const fetchPublicWard = async () => {
        const response = await apiGetPublicWard(district)
        if (response.status === 200) {
            setWards(response.data?.results)
        }
    }
    district && fetchPublicWard()
    !district ? setReset(true) : setReset(false)
    !district && setDistricts([])
}, [district])
  // useEffect(() => {
  //     setPayload(prev => ({
  //         ...prev,
  //         address: `${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
  //         province: province ? provinces?.find(item => item.province_id === province)?.province_name : ''
  //     }))

  // }, [province, district])
  console.log('response', wards)
  return (
    <div>
    <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
    <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-4'>
            <Select type='province' value={province} setValue={setProvince} options={provinces} label='Tỉnh/Thành phố' />
            <Select reset={reset} type='district' value={district} setValue={setDistrict} options={districts} label='Quận/Huyện' />
            <Select reset={reset} type='ward' value={ward} setValue={setWard} options={wards} label='Xã/Phường/Thị trấn' />
        </div>
        <InputReadOnly
            label='Địa chỉ chính xác'
            value={`${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`}
        />

    </div>
</div>
  )
}

export default VietNameseProvinces
