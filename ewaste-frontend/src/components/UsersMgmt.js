import React from "react";
import {useState, useEffect} from "react";
import AppNavigation from "../common/AppNavigation";
import {Button, Table, Watermark} from 'antd';
import './Components.css'
import {PlusOutlined} from "@ant-design/icons";
import { getAllUsers } from '../util/APIUtils';
import {NavLink} from 'react-router-dom';
import Alert from "react-s-alert";

const {Column} = Table;

const Users = () => {
    const [usersData, setUsersData] = useState([]);
    // const [usernameFilters, setUsernameFilters] = useState([]);

    const fetchUsers = () => {
        getAllUsers()
            .then(response => {
                console.log(response);
                setUsersData(response.result); // Assuming response is an array of users
                // if(response.result){
                //     const tempFilter = [];
                //     response.result.forEach(userdata => {
                //         if (!tempFilter.some(filter => filter.value === userdata.userName)) {
                //             tempFilter.push({
                //                 text: userdata.userName,
                //                 value: userdata.userName
                //             })
                //         }
                //     })
                //     if(tempFilter){
                //         setUsernameFilters(tempFilter);
                //     }
                // }
            }).catch(error => {
                Alert.error('Oops! You do not have access to modify the user information!');
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const rowClassName = (record) => {
        return record.classification === 'unknown' ? 'unknown-row' : '';
    };

    return (
        <div>
            <AppNavigation/>
            <Watermark className="content-container" content={['']}>
                <div className="table-title">
                    <p style={{fontSize: "30px"}}>Users</p>
                    <a href="/users/new">
                        <Button type="primary" style={{margin: "15px"}}>New Staff <PlusOutlined/></Button>
                    </a>
                </div>
                <Table dataSource={usersData} rowKey="id" scroll={{x: "max-content"}}
                       rowClassName={rowClassName}
                       bordered
                       footer={() => ''}
                >
                    <Column title="User ID" dataIndex="id" key="id"
                            fixed="left"
                            sorter={(a, b) => a.id - b.id}
                    />
                    <Column title="Login Name" dataIndex="loginName" key="loginName"/>
                    <Column title="User Name" dataIndex="userName" key="userName"/>
                    <Column title="Contact" dataIndex="phone" key="phone"/>
                    <Column title="Email" dataIndex="email" key="email"/>
                    <Column
                        title="Role"
                        key="role"
                        render={(text, record) => (
                            <span>
                                {record.authorities.map(role => (
                                    <span key={role.roleCode}>{role.roleName.toLowerCase()} </span>
                                ))}
                            </span>
                        )}
                    />
                    <Column
                        title=" "
                        key="action"
                        fixed="right"
                        render={(value, record) => (
                            <NavLink to={{
                                pathname: `/users/${record.id}`,
                                state: {id: record.id}}}
                                     style={{textDecoration: "underline"}}
                            >
                                Edit
                            </NavLink>
                        )}
                    />
                </Table>
            </Watermark>

        </div>
    );
};

export default Users;
