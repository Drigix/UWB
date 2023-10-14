package com.uwb.notificationserver;

import io.github.cdimascio.dotenv.Dotenv;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;



@SpringBootApplication
@Slf4j
@EnableScheduling
public class NotificationServerApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().directory("D:\\Users\\michr\\source\\repos\\UWB\\uwb-notification-server\\.env").load();
		String url = dotenv.get("DB_URL");
		String username = dotenv.get("DB_USERNAME");
		String password = dotenv.get("DB_PASSWORD");
		String email = dotenv.get("EMAIL");
		String emailPassword = dotenv.get("EMAIL_PASSWORD");
		System.setProperty("DB_URL", url);
		System.setProperty("DB_USERNAME", username);
		System.setProperty("DB_PASSWORD", password);
		System.setProperty("EMAIL", email);
		System.setProperty("EMAIL_PASSWORD", emailPassword);
		SpringApplication.run(NotificationServerApplication.class, args);
	}
}