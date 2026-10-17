package com.nutrifit.config;

import java.sql.Connection;
import java.sql.SQLException;

/** VNPay module adapter to the application's shared MySQL connection. */
public final class PaymentChatDb {
    private PaymentChatDb() { }
    public static Connection getConnection() throws SQLException {
        return DatabaseConfig.getConnection();
    }
}
