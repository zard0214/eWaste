package uk.shef.msc8.ewaste.interfaces.dto;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.util.StringUtils;

import java.beans.PropertyDescriptor;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 03:42
 */
public interface Copier {

    default <T> void copy(T target) {
        BeanUtils.copyProperties(this, target);
    }

    default <T> T copy(Class<T> type) {
        T target = BeanUtils.instantiateClass(type);
        copy(target);
        return target;
    }

    default <T> void copyNotNull(T target) {
        BeanWrapper wrapper = new BeanWrapperImpl(this);
        PropertyDescriptor[] pds = wrapper.getPropertyDescriptors();
        Set<String> properties = new HashSet<>();
        for (PropertyDescriptor propertyDescriptor : pds) {
            String propertyName = propertyDescriptor.getName();
            Object propertyValue = wrapper.getPropertyValue(propertyName);
            if (propertyValue != null) {
                if (propertyValue instanceof String && !StringUtils.hasText((String) propertyValue)) {
                    properties.add(propertyName);
                }
            } else {
                properties.add(propertyName);
            }
        }
        BeanUtils.copyProperties(this, target, properties.toArray(new String[0]));
        properties.clear();
    }
}
