import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../redux/actions/product';
import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Box, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import Loader from '../Layouts/Loader';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { getAllOrdersOfShop } from '../../redux/actions/order';

const AllOrders = () => {
    const {products, isLoading} = useSelector((state) => state.products);
    const {orders} = useSelector((state) => state.order);
    const{seller} = useSelector((state) => state.seller);
    const[open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [coupouns,setCoupouns] = useState([]);
    const [minAmount, setMinAmout] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [value, setValue] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id));
    },[dispatch])

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
      //  window.location.reload();
      setTimeout(function(){window.location.reload(true);},100)
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
      }

      const columns = [
        { field: "id", headerName: "ID Đơn hàng", minWidth: 150, flex: 0.7,headerClassName: "super-app-theme--header", },
    
        {
          field: "status",
          headerName: "Trạng thái",
          minWidth: 130,
          flex: 0.7,headerClassName: "super-app-theme--header",
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Số lượng",
          type: "number",
          minWidth: 130,
          flex: 0.7,
          headerClassName: "super-app-theme--header",
        },
    
        {
          field: "total",
          headerName: "Thành tiền",
          type: "number",
          minWidth: 130,
          flex: 0.8,
          headerClassName: "super-app-theme--header",
        },
    
        {
          field: "Xem",
          flex: 1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          headerClassName: "super-app-theme--header",
          renderCell: (params) => {
            return (
              <>
                <Link to={`/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];
    
      const row = [];
    
      orders &&
        orders.forEach((item) => {
          row.push({
            id: item._id,
            itemsQty: item.cart.length,
            total: "US$ " + item.totalPrice,
            status: item.status,
          });
        });
    
  return (
    <>
    {isLoading ? (
      <Loader />
    ) : (
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        {/* <div className='w-full flex justify-end'>
          <div className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
          onClick={() =>setOpen(true)}>
            <span className='text-white'> Create Coupoun Code</span>
          </div>  
        </div> */}
         <Box
          sx={{
            height: 300,
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "rgba(4, 57, 10, 0.79)",
              fontSize: 16,
              fontWeight: "700",
              color: "#fff",
            },
          }}
        >
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        /></Box>
      </div>
    )}
  </>
  )
}

export default AllOrders
