package uk.shef.msc8.ewaste.infrastructure.common.helper;

import org.springframework.lang.NonNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Calendar;
import java.util.Date;

/**
 * @author Zhecheng Zhao
 * @RegistrationNo 220186627
 * @date Created in 16/02/2024 02:51
 */
public enum DateUtils {

    ;
    private static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
    private static final String DEFAULT_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    private static final ZoneId DEFAULT_ZONE_ID = ZoneId.systemDefault();
    private static final DateTimeFormatter DEFAULT_DATE_FORMATTER = DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT);
    private static final DateTimeFormatter DEFAULT_DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(DEFAULT_DATE_TIME_FORMAT);

    private static final int S = 1000;

    private static final int MIN = S * 60;

    private static final int H = MIN * 60;

    private static final int D = H * 24;

    public static Date ofDate(String date) {
        try {
            return ofDate(date, DEFAULT_ZONE_ID, DEFAULT_DATE_TIME_FORMATTER);
        } catch (DateTimeParseException exception) {
            return ofDate(date, DEFAULT_ZONE_ID, DEFAULT_DATE_FORMATTER);
        }
    }

    public static Date ofDate(String date, String format) {
        return ofDate(date, DEFAULT_ZONE_ID, DateTimeFormatter.ofPattern(format));
    }

    public static Date ofDate(String date, ZoneId zoneId, DateTimeFormatter formatter) {
        return Date.from(LocalDate.parse(date, formatter).atStartOfDay().atZone(zoneId).toInstant());
    }

    public static String formatDate(@NonNull Date date) {
        return format(date, DEFAULT_ZONE_ID, DEFAULT_DATE_FORMATTER);
    }

    public static String formatDateTime(@NonNull Date date) {
        return format(date, DEFAULT_ZONE_ID, DEFAULT_DATE_TIME_FORMATTER);
    }


    public static String format(@NonNull Date date, @NonNull String format) {
        return format(date, DEFAULT_ZONE_ID, DateTimeFormatter.ofPattern(format));
    }

    public static String format(@NonNull Date date, ZoneId zoneId, DateTimeFormatter formatter) {
        return LocalDateTime.ofInstant(date.toInstant(), zoneId).format(formatter);
    }

    public static Date getEndOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        setCalendarTime(calendar, 23, 59, 59, 999);
        return calendar.getTime();
    }

    public static Date getStartOfDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        setCalendarTime(calendar, 0, 0, 0, 0);
        return calendar.getTime();
    }

    public static Date getLastDayOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        return calendar.getTime();
    }

    public static Date getFirstDayOfMonth(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.setTime(date);
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
        return calendar.getTime();
    }

    public static boolean isCurrentDate(@NonNull Date date) {
        return date.after(Date.from(LocalDate.now().atStartOfDay(DEFAULT_ZONE_ID).toInstant())) &&
                date.before(Date.from(LocalDate.now().plusDays(1).atStartOfDay(DEFAULT_ZONE_ID).toInstant()));
    }

    public static String anyTimeByDay(Date date, int calendarEnum, int count) {
        return LocalDateTime.ofInstant(getYourCalendar(date, calendarEnum, count).toInstant(), DEFAULT_ZONE_ID).format(DEFAULT_DATE_TIME_FORMATTER);
    }

    public static String anyTimeByCurrentDay(int calendarEnum, int count) {
        return anyTimeByDay(new Date(), calendarEnum, count);
    }

    public static Date anyDateByCurrentDay(int calendarEnum, int count) {
        return anyDateByDay(new Date(), calendarEnum, count);
    }

    public static Date anyDateByDay(Date date, int calendarEnum, int count) {
        return Date.from(getYourCalendar(date, calendarEnum, count).toInstant());
    }

    public static String costTimeByMs(long costTime) {
        int yearDay = 365;
        int monthDay = 30;
        long day = costTime / D;
        long hour = (costTime - day * D) / H;
        long minute = (costTime - day * D - hour * H) / MIN;
        long second = (costTime - day * D - hour * H - minute * MIN) / S;
        long milliSecond = costTime - day * D - hour * H - minute * MIN - second * S;
        StringBuilder result = new StringBuilder();
        if (day != 0) {
            if (day >= yearDay) {
                long year = day / yearDay;
                result.append(year).append("year ");
                day = day - year * yearDay;
            }
            if (day < yearDay && day >= monthDay) {
                long month = day / monthDay;
                result.append(month).append("month ");
                day = day - month * monthDay;
            }
            if (day != 0 && day < monthDay) result.append(day).append("day ");
        }
        if (hour != 0) result.append(hour).append("hour ");
        if (minute != 0) result.append(minute).append("min ");
        if (second != 0) result.append(second).append("second ");
        if (milliSecond != 0) result.append(milliSecond).append("ms ");
        return result.toString();
    }

    public static String costTimeByMs(long startTime, long endTime) {
        return costTimeByMs(endTime - startTime);
    }

    private static Calendar getYourCalendar(Date date, int field, int value) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(field, calendar.get(field) + value);
        return calendar;
    }

    private static void setCalendarTime(Calendar calendar, int hour, int minute, int second, int millisecond) {
        calendar.set(Calendar.HOUR_OF_DAY, hour);
        calendar.set(Calendar.MINUTE, minute);
        calendar.set(Calendar.SECOND, second);
        calendar.set(Calendar.MILLISECOND, millisecond);
    }
}
