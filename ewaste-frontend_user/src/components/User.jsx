import React, {useState} from "react";
import {Button} from "bootstrap";
import {changepwd, getUserOrder, updateUser} from "../util/APIUtils";
import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import axios from "axios";
import Alert from "react-s-alert";
import account from "../img/account.png"
import QRcode from "./qrcode";


export default function Profile({ currentUser,state }){

    function getOrderStatus(s) {
        switch (s) {
            case -10:
                return "CANCEL";
            case 0:
                return "INITIALISED";
            case 10:
                return "RECEIVED";
            case 20:
                return "RETRIEVED";
            case 30:
                return "DISPATCHING";
            case 40:
                return "WIPING";
            case 50:
                return "COMPLETE";
            case 60:
                return "PAY SUCCESS";
            case 7:
                return "DISPATCH";
            case 8:
                return "WIPE";
            default:
                return "UNKNOWN";
        }
    }

    const [selectedTab, setSelectedTab] = useState("userInfo");
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [newPassword, setNewPassword] = useState(currentUser ? currentUser.password : '');
    const [userName, setUserName] = useState(currentUser ? currentUser.userName : '');
    const [userPhone, setUserPhone] = useState(currentUser ? currentUser.phone : '');
    const [userGender, setUserGender] = useState(currentUser ? currentUser.gender : '');
    const [recipientName, setRecipientName] = useState(localStorage.getItem('recipientName'));
    const [addressLine, setAddressLine] = useState(localStorage.getItem('addressLine'));
    const [town, setTown] = useState(localStorage.getItem('town'));
    const [county, setCounty] = useState(localStorage.getItem('county'));
    const [postcode, setPostcode] = useState(localStorage.getItem('postcode'));
    const [phone, setPhone] = useState(localStorage.getItem('phone'));
    const [recycleData, setRecycleData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const totalPages = Math.ceil(recycleData.length / itemsPerPage);
    const startIndex = (currentPage-1) * itemsPerPage;
    const endIndex = (startIndex+itemsPerPage>recycleData.length)?recycleData.length-startIndex:startIndex+itemsPerPage;
    const currentItems = recycleData.slice(startIndex,endIndex);

    const [orders, setOrder] = useState([]);
    const [currentOrderPage, setCurrentOrderPage] = useState(1);
    const totalOrderPages = Math.ceil(orders.length / itemsPerPage);
    const startOrderIndex = (currentOrderPage-1) * itemsPerPage;
    const endOrderIndex = (startOrderIndex+itemsPerPage>orders.length)?orders.length-startOrderIndex:startOrderIndex+itemsPerPage;
    const currentOrders = orders.slice(startOrderIndex,endOrderIndex);

    const [purchase, setPurchase] = useState([]);
    const [currentPurchasePage, setCurrentPurchasePage] = useState(1);
    const totalPurchasePages = Math.ceil(purchase.length / itemsPerPage);
    const startPurchaseIndex = (currentOrderPage-1) * itemsPerPage;
    const endPurchaseIndex = (startOrderIndex+itemsPerPage>purchase.length)?purchase.length-startOrderIndex:startOrderIndex+itemsPerPage;
    const currentPurchase = purchase.slice(startPurchaseIndex,endPurchaseIndex);

    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        if (tab === "myRecycle") {
            handleUserRecycleSearch();
        }
        else if(tab ==="myOrder"){
            handleUserOrderSearch();
        }
        else if(tab ==="myPurchase"){
            handlePurchaseOrderSearch();
        }
    };
    const handleEditClick = () =>{
        setIsEditing(true);
    }

    const handleAdEditClick = () =>{
        setIsEditingAddress(true);
    }

    const handleSubmitClick = () =>{
        let genderValue = userGender === 'male' ? 0 : 1;
        const newUser = { ...currentUser,
            userName: userName,
            phone: userPhone,
            gender: genderValue
        };
        const response = updateUser(newUser)
            .then(response => {
                console.log("profile update successfully:", response);
                currentUser.userName = userName;
                currentUser.phone = userPhone;
                currentUser.gender = genderValue;
                setIsEditing(false);
            })
            .catch(error => {
                console.error("Error profile update:", error);
            });
    }

    const handleAdSubmitClick = () => {
        localStorage.setItem('recipientName', recipientName);
        localStorage.setItem('addressLine',addressLine);
        localStorage.setItem('town',town);
        localStorage.setItem('county',county);
        localStorage.setItem('postcode',postcode);
        localStorage.setItem('phone',phone);
        setIsEditingAddress(false);
    };


    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleGenderChange = (event) => {
        setUserGender(event.target.value);
    };

    const handleUserPhoneChange = (event) => {
        setUserPhone(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleRecipientNameChange = (event) =>{
        setRecipientName(event.target.value);
    }

    const handleAddressLineChange = (event) =>{
        setAddressLine(event.target.value);
    }

    const handleTownChange = (event) =>{
        setTown(event.target.value);
    }

    const handleCountyChange = (event) =>{
        setCounty(event.target.value);
    }

    const handlePostCodeChange = (event) =>{
        setPostcode(event.target.value);
    }

    const handlePhoneChange = (event) =>{
        setPhone(event.target.value);
    }

    const handleUserRecycleSearch = async () => {
        try {
            //const response = await axios.get(`http://localhost:8080/order/all`,config);
            const orderDTO={
                orderType:1
            }
            const response = await getUserOrder(orderDTO);
            const orders = response.result;

            console.log("Search result: "+ orders);
            setRecycleData(orders);
        } catch (error) {
            console.error("Error performing search: ", error);
        }
    };

    const handleProductClick = (product) => {
        window.location.href = "/DeviceDetail?productData=" + encodeURIComponent(JSON.stringify(product));
        console.log(product)
    };

    const handleUserOrderSearch = async () => {
        try {
            const orderDTO={
                orderType:2
            }
            const response = await getUserOrder(orderDTO);
            console.log(response.result)
            const orders = response.result;
            console.log("Search result: "+ orders);
            setOrder(orders);
        } catch (error) {
            console.error("Error performing search: ", error);
        }
    };

    const handlePurchaseOrderSearch = async () => {
        try {
            const orderDTO={
                orderType:3
            }
            const response = await getUserOrder(orderDTO);
            const orders = response.result;
            console.log("Search result: "+ orders);
            setPurchase(orders);
        } catch (error) {
            console.error("Error performing search: ", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePageBack = () => {
        setCurrentPage(currentPage-1);
    };

    const handlePageForward = () => {
        setCurrentPage(currentPage+1);
    };

    const handlePurchasePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePurchasePageBack = () => {
        setCurrentPage(currentPage-1);
    };

    const handlePurchasePageForward = () => {
        setCurrentPage(currentPage+1);
    };

    const handleOrderPageChange = (pageNumber) => {
        setCurrentOrderPage(pageNumber);
    };

    const handleOrderPageBack = () => {
        setCurrentOrderPage(currentOrderPage-1);
    };

    const handleOrderPageForward = () => {
        setCurrentOrderPage(currentOrderPage+1);
    };

    const handleShowQR = (id) => {
        setSelectedOrderId(id);
    };

    const handleCloseQR = () => {
        setSelectedOrderId(null);
    };

    const PageNumbers = () => {
        const pageNumbers = [];
        if(currentPage>1){
            pageNumbers.push(
                <li>
                    <button className="page-link" onClick={() => handlePageBack()}>
                        &laquo;
                    </button>
                </li>
            );
        }

        let start = Math.max(currentPage-3,2);
        let end = Math.min(currentPage+3,totalPages-1);

        pageNumbers.push(
            <li className={`page-item ${currentPage === 1 ? 'active' : ''}`} key={1}>
                <button className="page-link" onClick={() => handlePageChange(1)}>
                    {1}
                </button>
            </li>
        );

        if(start>2) {
            pageNumbers.push(
                <li>
                    ...
                </li>
            );

        }

        for (let i = start; i <= end; i++) {
            if(i===1||i===totalPages){
                continue;
            }
            else{
                pageNumbers.push(
                    <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
                        <button className="page-link" onClick={() => handlePageChange(i)}>
                            {i}
                        </button>
                    </li>
                );
            }
        }

        if(end<totalPages-1) {
            pageNumbers.push(
                <li>
                    ...
                </li>
            );

        }

        if(totalPages>1){
            pageNumbers.push(
                <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`} key={totalPages}>
                    <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                        {totalPages}
                    </button>
                </li>
            );
        }

        if(totalPages>1&&currentPage<totalPages){
            pageNumbers.push(
                <li>
                    <button className="page-link" onClick={() => handlePageForward()}>
                        &raquo;
                    </button>
                </li>
            );
        }
        return pageNumbers;
    };

    const PurchasePageNumbers = () => {
        const pageNumbers = [];
        if(currentPurchasePage>1){
            pageNumbers.push(
                <li>
                    <button className="page-link" onClick={() => handlePurchasePageBack()}>
                        &laquo;
                    </button>
                </li>
            );
        }

        let start = Math.max(currentPurchasePage-3,2);
        let end = Math.min(currentPurchasePage+3,totalPurchasePages-1);

        pageNumbers.push(
            <li className={`page-item ${currentPage === 1 ? 'active' : ''}`} key={1}>
                <button className="page-link" onClick={() => handlePurchasePageChange(1)}>
                    {1}
                </button>
            </li>
        );

        if(start>2) {
            pageNumbers.push(
                <li>
                    ...
                </li>
            );

        }

        for (let i = start; i <= end; i++) {
            if(i===1||i===totalPurchasePages){
                continue;
            }
            else{
                pageNumbers.push(
                    <li className={`page-item ${currentPage === i ? 'active' : ''}`} key={i}>
                        <button className="page-link" onClick={() => handlePurchasePageChange(i)}>
                            {i}
                        </button>
                    </li>
                );
            }
        }

        if(end<totalPurchasePages-1) {
            pageNumbers.push(
                <li>
                    ...
                </li>
            );

        }

        if(totalPurchasePages>1){
            pageNumbers.push(
                <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`} key={totalPages}>
                    <button className="page-link" onClick={() => handlePurchasePageChange(totalPages)}>
                        {totalPurchasePages}
                    </button>
                </li>
            );
        }

        if(totalPurchasePages>1&&currentPurchasePage<totalPurchasePages){
            pageNumbers.push(
                <li>
                    <button className="page-link" onClick={() => handlePurchasePageForward()}>
                        &raquo;
                    </button>
                </li>
            );
        }
        return pageNumbers;
    };

    const OrderPageNumbers = () => {
        const pageNumbers = [];
        if (currentOrderPage > 1) {
            pageNumbers.push(
                <li>
                    <button className="page-link" onClick={() => handleOrderPageBack()}>
                        &laquo;
                    </button>
                </li>
            );
        }

        let start = Math.max(currentOrderPage - 3, 2);
        let end = Math.min(currentOrderPage + 3, totalOrderPages - 1);

        pageNumbers.push(
            <li className={`page-item ${currentOrderPage === 1 ? 'active' : ''}`} key={1}>
                <button className="page-link" onClick={() => handleOrderPageChange(1)}>
                    {1}
                </button>
            </li>
        );

        if (start > 2) {
            pageNumbers.push(
                <li>
                    ...
                </li>
            );

        }

        for (let i = start; i <= end; i++) {
            if (i === 1 || i === totalOrderPages) {
                continue;
            } else {
                pageNumbers.push(
                    <li className={`page-item ${currentOrderPage === i ? 'active' : ''}`} key={i}>
                        <button className="page-link" onClick={() => handleOrderPageChange(i)}>
                            {i}
                        </button>
                    </li>
                );
            }
        }

        if (end < totalOrderPages - 1) {
            pageNumbers.push(
                <li>
                    ...
                </li>
            );

        }

        if (totalOrderPages > 1) {
            pageNumbers.push(
                <li className={`page-item ${currentOrderPage === totalOrderPages ? 'active' : ''}`} key={totalOrderPages}>
                    <button className="page-link" onClick={() => handleOrderPageChange(totalOrderPages)}>
                        {totalOrderPages}
                    </button>
                </li>
            );
        }

        if (totalOrderPages > 1 && currentOrderPage < totalOrderPages) {
            pageNumbers.push(
                <li>
                    <button className="page-link" onClick={() => handleOrderPageForward()}>
                        &raquo;
                    </button>
                </li>
            );
        }
        return pageNumbers;
    };


    const handleDataRetrievalOrderClick = (order) => {
        const url = "/payment2?orderData=" + encodeURIComponent(JSON.stringify(order));
        window.location.href = url;
    };

    return(
        <div className="container text-center py-4">
            <div className="row justify-content-center">
                <div className="row text-lg-start mb-4">
                    <a href="/ " className="text-decoration-none text-black">Homepage > User</a>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="rounded-circle overflow-hidden mx-auto mt-5" style={{width: "100px", height: "100px"}}>
                            {currentUser.imageUrl ? (
                                <img src={currentUser.imageUrl} alt="user"
                                     style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                            ) : (
                                <img src={account} alt="user"
                                     style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                            )}
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item mt-5" onClick={() => handleTabClick("userInfo")}>My
                                    Profile
                                </li>
                                <li className="list-group-item mt-5" onClick={() => handleTabClick("myRecycle")}>My
                                    Recycle
                                </li>
                                <li className="list-group-item mt-5" onClick={() => handleTabClick("myPurchase")}>My
                                    Purchase
                                </li>
                                <li className="list-group-item mt-5 mb-5" onClick={() => handleTabClick("myOrder")}>My
                                    DataRetrieval
                                </li>
                            </ul>
                            <button className="btn btn-danger" onClick={state}>Logout</button>
                        </div>
                    </div>
                </div>
                <div className="col-8 text-lg-start">
                    {selectedTab==="userInfo" &&(
                        <div className="card">
                            <div className="card-body">
                                <h1 className="px-3">My Profile</h1>
                                <div className="card mt-3">
                                    <div className="card-body">
                                        <div className="card-title">
                                            <div className="row">
                                                <div className="col-8">
                                                    <h3>Personal info</h3>
                                                </div>
                                                <div className="col-3 mx-2">
                                                    {isEditing ? (
                                                        <button className="btn btn-success" onClick={handleSubmitClick}>Submit</button>
                                                    ) : (
                                                        <button className="btn btn-danger" onClick={handleEditClick}>Edit</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-6">
                                                    {isEditing ? (
                                                        <span>Name:
                                                        <input type="text" className="form-control" value={userName}
                                                               onChange={handleUserNameChange}/></span>
                                                    ) : (
                                                        <span>Name: {currentUser.userName}</span>
                                                    )}
                                                </div>
                                                <div className="col-6">
                                                    {isEditing ? (
                                                        <span>Gender:
                                                                <select className="form-control" value={userGender}
                                                                        onChange={handleGenderChange}>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                </select></span>
                                                    ) : (
                                                        <span>Gender: {currentUser.gender === 0 ? "Male" : "Female"}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="">
                                                    {isEditing ? (
                                                        <input type="text" className="form-control" value={userPhone} onChange={handleUserPhoneChange} />
                                                    ) : (
                                                        <span>Phone Number: {currentUser.phone}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="">
                                                    Email Address: {currentUser.email}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mt-3">
                                    <div className="card-body">
                                        <div className="card-title">
                                            <div className="row">
                                                <div className="col-8">
                                                    <h3>Address</h3>
                                                </div>
                                                <div className="col-3 mx-2">
                                                    {isEditingAddress ? (
                                                        <button className="btn btn-success"
                                                                onClick={handleAdSubmitClick}>Submit</button>
                                                    ) : (
                                                        <button className="btn btn-danger"
                                                                onClick={handleAdEditClick}>Edit</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="card-body">
                                            <div className="row">
                                                {isEditingAddress ? (
                                                    <span>Recipient Name:
                                                        <input type="text" className="form-control"
                                                               value={recipientName}
                                                               onChange={handleRecipientNameChange}/></span>
                                                ) : (
                                                    localStorage.getItem("recipientName") ? (
                                                        <span>Recipient Name: {localStorage.getItem("recipientName")}</span>
                                                    ): (
                                                        <span>Recipient Name: {"Not Set"}</span>
                                                    )

                                                )}
                                            </div>
                                            <div className="row mt-5">
                                                {isEditingAddress ? (
                                                    <span>Address Line:
                                                        <input type="text" className="form-control" value={addressLine}
                                                               onChange={handleAddressLineChange}/></span>
                                                ) : (
                                                    localStorage.getItem("addressLine") ? (
                                                        <span>Address Line: {localStorage.getItem("addressLine")}</span>
                                                    ): (
                                                        <span>Address Line: {"Not Set"}</span>
                                                    )
                                                )}
                                            </div>
                                            <div className="row  mt-5">
                                                <div className="col-6">
                                                    {isEditingAddress ? (
                                                        <span>Town/City:
                                                        <input type="text" className="form-control" value={town}
                                                               onChange={handleTownChange}/></span>
                                                    ) : (
                                                        localStorage.getItem("town") ? (
                                                            <span>Town/City: {localStorage.getItem("town")}</span>
                                                        ): (
                                                            <span>Town/City: {"Not Set"}</span>
                                                        )
                                                    )}
                                                </div>
                                                <div className="col-6">
                                                    {isEditingAddress ? (
                                                        <span>County:
                                                        <input type="text" className="form-control" value={county}
                                                               onChange={handleCountyChange}/></span>
                                                    ) : (
                                                        localStorage.getItem("county") ? (
                                                            <span>County: {localStorage.getItem("county")}</span>
                                                        ): (
                                                            <span>County: {"Not Set"}</span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="">
                                                    {isEditingAddress ? (
                                                        <span>Postcode:
                                                        <input type="text" className="form-control" value={postcode}
                                                               onChange={handlePostCodeChange}/></span>
                                                    ) : (
                                                        localStorage.getItem("postcode") ? (
                                                            <span>Postcode: {localStorage.getItem("postcode")}</span>
                                                        ) : (
                                                            <span>Postcode: {"Not Set"}</span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row mt-5">
                                                <div className="">
                                                    {isEditingAddress ? (
                                                        <span>Phone:
                                                        <input type="text" className="form-control" value={phone}
                                                               onChange={handlePhoneChange}/></span>
                                                    ) : (
                                                        localStorage.getItem("phone") ? (
                                                            <span>Phone: {localStorage.getItem("phone")}</span>
                                                        ): (
                                                            <span>Phone: {"Not Set"}</span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                    {selectedTab === "myRecycle" && (
                        <div className="card">
                            <div className="card-body">
                                <h1>My Recycle</h1>
                                {currentItems.map((order) =>
                                    <div className="card mt-5">
                                        <div className="card-body">
                                            <h5 className="card-title">Order ID: {order.id}</h5>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <p className="card-text">Order Type: Recycle</p>
                                                    <p className="card-text">Name: {order.receiverName}</p>
                                                    <p className="card-text">Product Name: {order.productName}</p>
                                                    <p className="card-text">Product ID: {order.productId}</p>
                                                    <p className="card-text">Recycle Store: {order.thirdParty}</p>
                                                    <p className="card-text" style={{color:"blue"}}>Status: {getOrderStatus(order.status)}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="card-text">QR Code: {order.qrcode !== 0 ?
                                                        <button type="button" className="btn btn-info" data-toggle="modal" data-target="#qrcodeModal"
                                                                onClick={() => handleShowQR(order.id)}
                                                        >
                                                            Open QRcode
                                                        </button> : "No QR Code"}
                                                    </p>
                                                    <p className="card-text">Created At: {order.gmtCreated}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="d-flex justify-content-end mt-5">
                                    <ul className="pagination" style={{bottom: '0'}}>
                                        {PageNumbers()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedTab === "myPurchase" && (
                        <div className="card">
                            <div className="card-body">
                                <h1>My Purchase</h1>
                                {currentPurchase.map((order) =>
                                    <div className="card mt-5">
                                        <div className="card-body">
                                            <h5 className="card-title">Order ID: {order.id}</h5>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <p className="card-text">Order Type: Purchase</p>
                                                    <p className="card-text">Name: {order.receiverName}</p>
                                                    <p className="card-text">Product Name: {order.productName}</p>
                                                    <p className="card-text">Product ID: {order.productId}</p>
                                                    <p className="card-text" style={{color:"blue"}}>Status: {getOrderStatus(order.status)}</p>
                                                    <p className="card-text">Receiver Phone: {order.receiverPhone}</p>
                                                    <p className="card-text">Receiver
                                                        Address: {order.receiverAddress}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="card-text">Total Amount: {order.totalAmount}</p>
                                                    <p className="card-text">Real Pay Amount: {order.realPayAmount}</p>
                                                    <p className="card-text">Postage Amount: {order.postageAmount}</p>
                                                    <p className="card-text">Service Fee
                                                        Amount: {order.serviceFeeAmount}</p>
                                                    <p className="card-text">QR Code: {order.qrcode !== 0 ?
                                                        <button type="button" className="btn btn-info" data-toggle="modal" data-target="#qrcodeModal"
                                                                onClick={() => handleShowQR(order.id)}
                                                        >
                                                            Open QRcode
                                                        </button> : "Used"}
                                                    </p>
                                                    <p className="card-text">Store: {order.thirdParty}</p>
                                                    <p className="card-text">Created At: {order.gmtCreated}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="d-flex justify-content-end mt-5">
                                    <ul className="pagination" style={{bottom: '0'}}>
                                        {PurchasePageNumbers()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedTab === "myOrder" && (
                        <div className="card">
                            <div className="card-body">
                                <h1>My Data Retrieval</h1>
                                {currentOrders.map((order) =>
                                    <div className="card mt-5 ">
                                        <div className="card-body">
                                            <h5 className="card-title">Order ID: {order.id}</h5>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <p className="card-text">Order Type: Data Retrieval</p>
                                                    <p className="card-text">Name: {order.receiverName}</p>
                                                    <p className="card-text">Product Name: {order.productName}</p>
                                                    <p className="card-text">Product ID: {order.productId}</p>
                                                    <p className="card-text" style={{color:"blue"}}>Status: {getOrderStatus(order.status)}</p>
                                                    <p className="card-text">Receiver
                                                        Address: {order.receiverAddress}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="card-text">Total Amount: {order.totalAmount}</p>
                                                    <p className="card-text">Real Pay Amount: {order.realPayAmount}</p>
                                                    <p className="card-text">Postage Amount: {order.postageAmount}</p>
                                                    <p className="card-text">Service Fee
                                                        Amount: {order.serviceFeeAmount}</p>
                                                    <p className="card-text">QR Code: {order.qrcode !== 0 ?
                                                        <button type="button" className="btn btn-info" data-toggle="modal" data-target="#qrcodeModal"
                                                                onClick={() => handleShowQR(order.id)}
                                                        >
                                                            Open QRcode
                                                        </button> : "Used"}
                                                    </p>
                                                    <p className="card-text">Store: {order.thirdParty}</p>
                                                    <p className="card-text">Created At: {order.gmtCreated}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {(order.status === 20)&&(
                                            <div className="row mt-3">
                                                <div className="col-md-6 mx-3 mb-3">
                                                    <button className="btn btn-danger" onClick={() => handleDataRetrievalOrderClick(order)}>Finish Payment</button>
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                            </div>
                                        )
                                        }
                                    </div>
                                )}
                                <div className="d-flex justify-content-end mt-5">
                                    <ul className="pagination" style={{bottom: '0'}}>
                                        {OrderPageNumbers()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {selectedOrderId && (
                <QRcode
                    orderId={selectedOrderId}
                    onClose={handleCloseQR}
                />
            )}
        </div>
    )
}
