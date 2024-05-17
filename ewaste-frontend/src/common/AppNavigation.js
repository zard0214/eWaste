import React from 'react';
import { Menu, Layout } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './AppNavigation.css'
import Alert from "react-s-alert";
import { getCurrentUser } from '../util/APIUtils';
import {ISADMIN} from "../constants";

const { SubMenu } = Menu;
const { Sider } = Layout

const AppNavigation = (props) => {

    const {
        globalCurrentCategory,
        location,
    } = props;

    const superAdmin = () => {
        return ["marry", "lily"]
    }

    const [category, setCategory] = useState("");
    // const [currentUserRoles, setCurrentUserRoles] = useState([]);
    let selectedKeys = [], openKeys = [];

    useEffect(()=>{
        globalCurrentCategory && setCategory(globalCurrentCategory.name)
        // getCurrentUserRoles();
    }, [globalCurrentCategory]);

    // const getCurrentUserRoles = () => {
    //     getCurrentUser()
    //     .then(response => {
    //         setCurrentUserRoles(response.result.authorities);
    //       }).catch(error => {
    //         Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
    //       });
    //
    // };
    //
    // const hasAdminRole = () => {
    //     console.log("Inside the Admin check function")
    //     return currentUserRoles.some(role => role.roleCode === 'ROLE_ADMIN');
    // };

    const menuList = [{
        title: "Home Page",
        key: "/ewaste/:home",
        icon: <DatabaseOutlined />,
        path: `/`,
        rule: /\/ewaste\/[\s\S]+\/home\/?$/,
    },{
        title: "Brands",
        key: "/ewaste/:brand/mngt/list",
        icon: <DatabaseOutlined />,
        path: "/brands",
        rule: /\/ewaste\/[\s\S]+\/brands\/?$/,
    },{
        title: "Series",
        key: "/ewaste/:series/mngt/list",
        icon: <DatabaseOutlined />,
        path: "/series",
        rule: /\/ewaste\/[\s\S]+\/series\/?$/,
    },{
        title: "Orders",
        key: "/ewaste/:order/mngt/list",
        icon: <DatabaseOutlined />,
        path: "/orders",
        rule: /\/ewaste\/[\s\S]+\/order\/?$/,
    },{
    //     title: "Products",
    //     key: "/ewaste/:product/mngt/list",
    //     icon: <DatabaseOutlined />,
    //     path: "/products",
    //     rule: /\/ewaste\/[\s\S]+\/product\/?$/,
    // },{
        title: "Products",
        key: "/ewaste/:productsV2/mngt/list",
        icon: <DatabaseOutlined />,
        path: "/productsV2",
        rule: /\/ewaste\/[\s\S]+\/productV2\/?$/,
    },{
        title: "Stores",
        key: "/ewaste/:stores/mngt/list",
        icon: <DatabaseOutlined />,
        path: "/stores",
        rule: /\/ewaste\/[\s\S]+\/stores\/?$/,
    },{
        title: "Store Products",
        key: "/ewaste/:storesProducts/mngt/list",
        icon: <DatabaseOutlined />,
        path: "/storesProducts",
        rule: /\/ewaste\/[\s\S]+\/storesProducts\/?$/,
    }
    ,{
        title: "Users",
        key: "/ewaste/:user/mngt/list",
        icon: <DatabaseOutlined />,
        path: "/users",
        rule: /\/ewaste\/[\s\S]+\/user\/?$/,
    }];

    let flag = false;
    const matchPath = (arr, path, defaultRes={}) => {
        let res = {
            key: null,
            parentKey: null,
            ...defaultRes,
        }
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if(flag) break;
            if(item.rule){
                const rule = item.rule
                const matched = rule.test(path)
                if (!matched) {
                    if(i >= arr.length - 1){
                        res = { ...res, parentKey: null }
                    }
                    continue;
                }else{
                    let key = item.key
                    if(res.parentKey){
                        res = { ...res, key }
                    }else{
                        res = { ...res, key, parentKey: null }
                    }
                    flag = true;
                    break;
                }
            }
            if (item.subMenus && Array.isArray(item.subMenus)) {
                const parentKey = item.key;
                const subMenusResult =  matchPath(item.subMenus, path, { parentKey })
                res = { ...res, ...subMenusResult }
            }
        }
        return res;
    }

    return (
        <div className="sidebar-container">
            <div className="sidebar-wrap" style={{width: "50px"} }>
                <Sider
                    className="sidebar"
                    // collapsible
                    // collapsed={collapsed}
                    theme="light"
                    // onCollapse={onCollapse}
                    style={{position: 'absolute'}}
                >
                    <Menu
                        className="sidebar-menu"
                        mode="inline"
                        defaultSelectedKeys={selectedKeys}
                        defaultOpenKeys={openKeys}
                    >
                        {menuList.map((item, idx) => {
                            // if (item.key === "/ewaste/:user/mngt/list" && !hasAdminRole()) {
                            if (item.key === "/ewaste/:user/mngt/list" && localStorage.getItem(ISADMIN) == "FALSE") {
                                return null;
                            }
                            return (
                                <React.Fragment key={idx}>
                                    {item.subMenus ? (
                                        <SubMenu
                                            key={item.key}
                                            icon={item.icon}
                                            title={item.title}
                                        >
                                            {item.subMenus.map((subItem, subIdx) => {
                                                return (
                                                    <Menu.Item key={subItem.key}>
                                                        <Link to={subItem.path}>{subItem.title}</Link>
                                                    </Menu.Item>
                                                )
                                            })}
                                        </SubMenu>
                                    ) : (
                                        // console.log(item.key, item.icon)
                                        <Menu.Item key={item.key} icon={item.icon}>
                                            <Link to={item.path}>{item.title}</Link>
                                        </Menu.Item>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </Menu>
                </Sider>
            </div>
        </div>
    );
}

export default AppNavigation;
