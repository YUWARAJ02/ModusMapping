package com.cyberhackathon.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Helper {

    private final static SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS");
    static SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd");
    public static Date getDate(final String Date) throws ParseException {
        return inputFormat.parse(Date);
    }
}
