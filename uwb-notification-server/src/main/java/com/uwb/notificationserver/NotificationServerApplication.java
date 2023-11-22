package com.uwb.notificationserver;

import io.github.cdimascio.dotenv.Dotenv;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;



@SpringBootApplication
@Slf4j
@ComponentScan(basePackages = {"com.uwb.notificationserver.*"})
@EntityScan("com.uwb.notificationserver.*")
@EnableScheduling
public class NotificationServerApplication {

	public static void main(String[] args) {
		// String envPath = System.getenv("ENV_FILE_PATH");
		// Dotenv dotenv = Dotenv.configure().directory(envPath).load();
		Dotenv dotenv = Dotenv.configure().directory("D:\\Users\\michr\\source\\repos\\UWB\\uwb-notification-server\\.env").load();
		String url = dotenv.get("DB_NOTIFICATION_URL");
		String username = dotenv.get("DB_NOTIFICATION_USERNAME");
		String password = dotenv.get("DB_NOTIFICATION_PASSWORD");
		log.info("DANE TUTAJ" + " " + url + " " + username + " " + password);
		String kafka_url = dotenv.get("KAFKA_URL");
		String email = dotenv.get("EMAIL");
		String emailPassword = dotenv.get("EMAIL_PASSWORD");
		System.setProperty("DB_URL", url);
		System.setProperty("DB_USERNAME", username);
		System.setProperty("DB_PASSWORD", password);
		System.setProperty("KAFKA_URL", kafka_url);
		System.setProperty("EMAIL", email);
		System.setProperty("EMAIL_PASSWORD", emailPassword);
		SpringApplication.run(NotificationServerApplication.class, args);
	}
}
