package uk.shef.msc8.ewaste.infrastructure.auth.config;

import uk.shef.msc8.ewaste.domain.user.repository.po.UserPO;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 24/04/2024 04:46
 */
public class UserInfoThreadHolder {

    private static final ThreadLocal<UserPO> userThreadLocal = new ThreadLocal<>();

    public static void addCurrentUser(UserPO user){
        userThreadLocal.set(user);
    }

    public static UserPO getCurrentUser(){
        return userThreadLocal.get();
    }

    public static void remove(){
        userThreadLocal.remove();
    }

}