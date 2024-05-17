import React, { useState, useEffect } from 'react';
import AppNavigation from "../common/AppNavigation";
import { useParams } from 'react-router-dom';
import {getUserById, updateUser, saveUser, addUserRole, upgradeUserToStaff, downgradeUserToStaff, uploadFile} from '../util/APIUtils';
import Alert from "react-s-alert";
import { Button , Divider, Form, Input, Radio, Image} from "antd";
const UserForm = (props) => {
    const [user, setUser] = useState({
        id: '',
        userName: '',
        phone1: '',
        phone: '',
        imageUrl: '',
        status: '',
        email: '',
        gender: '',
        provider: '',
        loginName: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [userauthorities, setAuthorities] = useState([]);
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);

    const allRoles = [
        { roleName: 'ADMIN', roleCode: 'ROLE_ADMIN' },
        { roleName: 'STAFF', roleCode: 'ROLE_STAFF' },
        { roleName: 'USER', roleCode: 'ROLE_USER' }
    ];
    useEffect(() => {
        const fetchUserByID = (id) => {
            const userId = {"id": id}
            getUserById(userId.id).then(response => {
                setUser(response.result);
                setAuthorities(response.result.authorities);
                setIsLoading(false);
            }).catch(error => {
                Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            });
        }
        const {state} = props.location;
        if(state !== undefined){
            const id = state.id;
            fetchUserByID(id);
        }
    }, [props.location]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser( prevUser => ({
            ...prevUser,
            [name]: value
        }));
        if (name === 'email') {
            validateEmail(value);
        } else if (name === 'phone') {
            validatePhone(value);
        }
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
        if (!emailRegex.test(value)) {
            setEmailError('Please enter a valid email address');
            setIsFormValid(false);
        } else {
            setEmailError('');
            setIsFormValid(true);
        }
    };

    const validatePhone = (value) => {
        const phoneRegex = /^\d{10}$/; // Regex for 10-digit phone number
        if (!phoneRegex.test(value)) {
            setPhoneError('Please enter a valid 10-digit phone number');
            setIsFormValid(false);
        } else {
            setPhoneError('');
            setIsFormValid(true);
        }
    }

    const state = props.location.state

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitBtn = document.getElementById("submit-btn");
        let cancelBtn = document.getElementById("cancel-btn");
        submitBtn.disabled = true;
        cancelBtn.disabled = true;
        if (user.id) {
            if (isFormValid) {
                // Update existing user
                user.gmtCreated = formatDateTime(user.gmtCreated)
                user.gmtModified = formatDateTime(new Date())
                updateUser(user)
                    .then(response => {
                        Alert.success("User updated successfully");
                        props.history.push("/users")
                    })
                    .catch(error => {
                        submitBtn.disabled = false;
                        cancelBtn.disabled = false;
                        Alert.error("Failed to update user");
                    });
            }
            else {
                submitBtn.disabled = false;
                cancelBtn.disabled = false;
                console.log('Form submission failed, phone number or email not correct');
            }
        }
        else {
            if (isFormValid) {
                // Add new user
                user.provider="local"
                saveUser(user)
                    .then(response => {
                        addUserRole({"id": response.result.id}).then(response => {
                            Alert.success("User added successfully");
                            props.history.push("/users")
                        })
                        .catch(error => {
                            Alert.error("Failed to add role")
                        })
                    })
                    .catch(error => {
                        submitBtn.disabled = false;
                        cancelBtn.disabled = false;
                        Alert.error("Failed to add user");
                    });
            }
            else{
                submitBtn.disabled = false;
                cancelBtn.disabled = false;
                console.log('Form submission failed, phone number or email not correct');
            }
        }
    };

    const handleDataUpload = (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file, 'file.png');

        uploadFile(formData)
            .then((response) => {
                console.log('Uploaded data result:', response.result);
                user.imageUrl = response.result
                setUser({...user, imageUrl: response.result});
                console.log('Uploaded data result:', user.imageUrl);
            }).catch((error) => {
                console.error('Upload failed:', error);
        });
    };

    function formatDateTime(dateTimeString) {
        const dateObject = new Date(dateTimeString);
        return dateObject.toISOString().slice(0, 19).replace('T', ' ');
    }

    function formatDateTime2(dateTimeString) {
        const date = new Date(dateTimeString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        return date.toLocaleString(options);
    }

    // Function to handle checkbox changes
    const handleChangeRole = (e, roleName, roleCode) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            // If the checkbox is checked, add the role to the user's authorities
            setUser(prevUser => ({
                ...prevUser,
                authorities: [...prevUser.authorities, { roleName, roleCode }]
            }));
        } else {
            // If the checkbox is unchecked, remove the role from the user's authorities
            setUser(prevUser => ({
                ...prevUser,
                authorities: prevUser.authorities.filter(role => role.roleCode !== roleCode)
            }));
        }
    };

    const handleUpgrade = (e) => {
        let submitBtn = document.getElementById("submit-btn");
        let cancelBtn = document.getElementById("cancel-btn");
        let upgradeBtn = document.getElementById("upgrade-btn");
        submitBtn.disabled = true;
        cancelBtn.disabled = true;
        upgradeBtn.disabled = true;
        upgradeUserToStaff(user)
            .then(() => {
                Alert.success("User upgraded successfully");
                props.history.push("/users")
            })
            .catch(error => {
                submitBtn.disabled = false;
                cancelBtn.disabled = false;
                upgradeBtn.disabled = false;
                Alert.error("Failed to upgrade user");
            });
    };

    const handleDowngrade = (e) => {
        let submitBtn = document.getElementById("submit-btn");
        let cancelBtn = document.getElementById("cancel-btn");
        let downgradeBtn = document.getElementById("downgrade-btn");
        submitBtn.disabled = true;
        cancelBtn.disabled = true;
        downgradeBtn.disabled = true;
        downgradeUserToStaff(user)
            .then(() => {
                Alert.success("User downgraded successfully");
                props.history.push("/users");
            })
            .catch(error => {
                submitBtn.disabled = false;
                cancelBtn.disabled = false;
                downgradeBtn.disabled = false;
                Alert.error("Failed to downgrade user");
            })
    }

    const handleCancel = (e) =>{
        window.location.href='/users';
    }

    return (
        <div>
          <AppNavigation/>
          <div className="content-container">
          <div className="card">
              <h2 className="form-title">{state === undefined ? "New User Details" : `User ID: ${user.id} Details`}</h2>
              <Divider></Divider>
              <div className="form-container">
                    <Form labelCol={{span: 4}} wrapperCol={{span: 17}} layout="horizontal" filled>
                        <Form.Item label="User Name" className="form-item">
                            <Input name="userName" value={user.userName}
                                   style={{color: "#000000"}} 
                                   required={true}
                                   onChange={(e) => handleChange(e)}
                                   rows={4}/>
                        </Form.Item>
                        <Form.Item label="Login Name" className="form-item">
                            <Input name="loginName" value={user.loginName}
                                   style={{color: "#000000"}} 
                                   required={true}
                                   onChange={(e) => handleChange(e)}
                                //    disabled={true}
                                   rows={4}/>
                        </Form.Item>
                        <Form.Item label="Contact" className="form-item"
                            validateStatus={phoneError ? 'error' : ''}
                            help={phoneError}>
                            <Input id="phone" name="phone" value={user.phone}
                                   required={true}
                                   onChange={(e) => handleChange(e)}
                                   rows={4}/>
                        </Form.Item>
                        <Form.Item label="Email" className="form-item"
                            validateStatus={emailError ? 'error' : ''}
                            help={emailError}>
                            <Input name="email" value={user.email}
                                   required={true}
                                   onChange={(e) => handleChange(e)}
                                //    disabled={true}
                                   style={{color: "#000000"}} rows={4}/>
                        </Form.Item>
                        <Form.Item required={true} label="Avatar">
                            <div>
                                <Image
                                    fallback="data:image/png;base64,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"
                                    width={200}
                                    height={200}
                                    src={user.imageUrl}
                                />
                                <Input style={{marginTop: "10px", marginRight: "50px", border: "0px"}} type="file" name="dataUrl"
                                       onChange={handleDataUpload}
                                />
                            </div>
                        </Form.Item>
                        <Form.Item label="Gender">
                            <Radio.Group 
                            onChange={(e) => {setUser({...user, gender: e.target.value});}} 
                            value={user.gender}>
                                <Radio value={0}> Male </Radio>
                                <Radio value={1}> Female </Radio>
                                <Radio value={2}> Prefer not to say </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Registed From" className="form-item">
                            <Input name="provider" 
                                    value={user.provider ? user.provider : "local"}
                                    required={true} disabled={true}
                                    style={{color: "#000000"}}  rows={4}
                                    onChange={(e) => handleChange(e)}/>
                        </Form.Item>
                        {user.gmtCreated && (
                            <Form.Item label="Created At" className="form-item">
                                <Input name="createdAt"
                                    value={formatDateTime2(user.gmtCreated)}
                                    disabled={true}
                                    style={{color: "#000000"}} rows={4}/>
                            </Form.Item>
                        )}
                        {user.gmtModified && (
                            <Form.Item label="Last Modified" className="form-item">
                                <Input name="lastModified"
                                    value={formatDateTime2(user.gmtModified)}
                                    disabled={true}
                                    style={{color: "#000000"}}  rows={4}/>
                            </Form.Item>
                        )}
                        
                        {user.authorities && (
                            <Form.Item label="Roles:" className="form-item">
                                {allRoles.map((role) => (
                                <div key={role.roleCode} className="form-check">
                                    <Input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`role-${role.roleCode}`}
                                        value={role.roleCode}
                                        checked={user.authorities.some(userRole => userRole.roleCode === role.roleCode)}
                                        disabled={true}
                                        onChange={(e) => handleChangeRole(e, role.roleName, role.roleCode)}
                                    />
                                    <label className="form-check-label" htmlFor={`role-${role.roleCode}`}>{role.roleName}</label>
                                </div>
                                ))}
                            </Form.Item>
                        )}
                    </Form>
              </div>
              <br/>
              <Divider></Divider>
              <div className="submit-btn-div" style={{marginBottom: "20px", marginRight: "50px"}}>
                          <Button id="cancel-btn" htmlType="button" onClick={handleCancel}>Cancel</Button>
                          <div style={{margin: "10px"}}></div>
                          {user.id && !userauthorities.some(role => role.roleCode === 'ROLE_STAFF') && (
                            <Button id="upgrade-btn" htmlType="submit" type="primary" onClick={handleUpgrade}>Upgrade To Staff</Button>
                          )}
                          {user.id && userauthorities.some(role => role.roleCode === 'ROLE_STAFF') && (
                            <Button id="downgrade-btn" htmlType="submit" type="primary" onClick={handleDowngrade}>Downgrade From Staff</Button>
                          )}
                          <div style={{margin: "10px"}}></div>
                          <Button id="submit-btn" type="submit" className="btn-primary" onClick={handleSubmit}>Save</Button>
              </div>
          </div>
          </div>
        </div>
    );
};

export default UserForm;
