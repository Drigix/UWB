package com.uwb.clientserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.uwb.clientserver.*")
@ComponentScan(basePackages = {"com.uwb.clientserver.*"})
@EntityScan("com.uwb.clientserver.*")
public class ClientServerApplication {
	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		String url = dotenv.get("DB_URL");
		String username = dotenv.get("DB_USERNAME");
		String password = dotenv.get("DB_PASSWORD");
		System.setProperty("DB_URL", url);
		System.setProperty("DB_USERNAME", username);
		System.setProperty("DB_PASSWORD", password);
		SpringApplication.run(ClientServerApplication.class, args);
	}

}
