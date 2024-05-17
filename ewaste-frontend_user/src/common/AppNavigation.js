import React from 'react';
import { Menu, Layout } from 'antd';
import {
    DatabaseOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './AppNavigation.css'

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

    // const [collapsed, setCollapsed] = useState(false);
    // const [zoo, setZoo] = useState("");
    const [category, setCategory] = useState("");
    let selectedKeys = [], openKeys = [];

    useEffect(()=>{
        globalCurrentCategory && setCategory(globalCurrentCategory.name)
    }, [globalCurrentCategory]);

    const menuList = [{
        title: "Home Page",
        key: "/ewaste/:home",
        icon: <DatabaseOutlined />,
        path: `/`,
        rule: /\/ewaste\/[\s\S]+\/home\/?$/,
    },{
        title: "Products",
        key: "/ewaste/:product/mngt/:type/list",
        icon: <UnorderedListOutlined />,
        subMenus: [{
            title: "Type",
            key: "/ewaste/:product/mngt/list",
            path: "/products",
            rule: /\/ewaste\/[\s\S]+\/product\/mngt\/+/,
        },{
            title: "Series",
            key: "/ewaste/:product/series/list",
            path: "/products",
            rule: /\/ewaste\/[\s\S]+\/product\/series\/+/,
        }]
    },{
        title: "Orders",
        key: "/ewaste/:order/mngt/list",
        icon: <DatabaseOutlined />,
        path: "/orders",
        rule: /\/ewaste\/[\s\S]+\/order\/?$/,
    },{
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

    // managerMenus();

    // const { key, parentKey } = matchPath(menuList, pathname);
    // key && (selectedKeys = [key]);
    // parentKey && (openKeys = [parentKey]);

    // const onCollapse = collapsed => {
    //     setCollapsed(collapsed);
    // };

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
