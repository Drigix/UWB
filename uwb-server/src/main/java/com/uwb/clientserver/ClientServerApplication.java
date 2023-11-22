package com.uwb.clientserver;

import com.uwb.clientserver.services.localization.LocalizationService;
import com.uwb.clientserver.websocket.ActivityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@Slf4j
@EnableScheduling
@EnableJpaRepositories("com.uwb.clientserver.*")
@ComponentScan(basePackages = {"com.uwb.clientserver.*"})
@EntityScan("com.uwb.clientserver.*")
@RequiredArgsConstructor
public class ClientServerApplication {

	private ActivityService activityService;
	private final LocalizationService localizationService;

	public static void main(String[] args) {
		// String envPath = System.getenv("ENV_FILE_PATH");
		// Dotenv dotenv = Dotenv.configure().directory(envPath).load();
		Dotenv dotenv = Dotenv.load();
		String url = dotenv.get("DB_URL");
		String username = dotenv.get("DB_USERNAME");
		String password = dotenv.get("DB_PASSWORD");
		String kafka_url = dotenv.get("KAFKA_URL");
		System.setProperty("DB_URL", url);
		System.setProperty("DB_USERNAME", username);
		System.setProperty("DB_PASSWORD", password);
		System.setProperty("KAFKA_URL", kafka_url);
		SpringApplication.run(ClientServerApplication.class, args);
	}
}
