/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/styles';
import { backend_url } from '../../server';

const DropDown = ({categoriesData,setDropDown}) => {
    const navigate = useNavigate();
    const submitHandle = (i) => {
        navigate(`/products?category=${i.name}`);
        setDropDown(false);
        // window.location.reload();
        setTimeout(function(){window.location.reload(true);},100)
    }
  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {
        categoriesData && categoriesData.map((i, index) => (
            <div key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => submitHandle(i)}
            >
                <img 
                src={`${backend_url}/${i.images}`}
                style={{
                    width:"25px",
                    height:"25px",
                    objectFit: "contain",
                    marginLeft: "10px",
                    userSelect: "none",
                }}
                alt=""/>
                <h3 className='m-3 cursor-pointer select-none'>{i.name}</h3>
            </div>
        ))}
    </div>
  );
};

export default DropDown
