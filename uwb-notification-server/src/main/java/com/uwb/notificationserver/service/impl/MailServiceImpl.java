package com.uwb.notificationserver.service.impl;

import com.uwb.notificationserver.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;
    private final Environment environment;
    private final TemplateEngine templateEngine;
    private static final String templateMailHeader = "UWB - POWIADOMIENIE";

    @Override
    public void sendEmail(String title, String message) {
        log.info("Send email with title {} and message {}.", title, message);
//        SimpleMailMessage mailModel = new SimpleMailMessage();
        String template = getMailTemplate(title, message);
//        mailModel.setFrom(environment.getProperty("spring.mail.username"));
//        mailModel.setTo("michrarr@gmail.com");
//        mailModel.setSubject(title);
//        mailModel.setText(template);
//        mailSender.send(mailModel);
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(Objects.requireNonNull(environment.getProperty("spring.mail.username")));
            messageHelper.setTo("michrarr@gmail.com");
            messageHelper.setSubject(title);
            messageHelper.setText(template, true);
        };
        mailSender.send(messagePreparator);
    }

//    @Scheduled(cron = "0 * * * * ?")
//    public void scheduleSendEmail() {
//        SimpleMailMessage mailModel = new SimpleMailMessage();
//        mailModel.setTo("michrarr@gmail.com");
//        mailModel.setSubject("TEST");
//        mailModel.setText("test");
//        sendEmail(mailModel);
//    }

    private String getMailTemplate(String title, String message) {
        Context context = new Context();
        context.setVariable("header", templateMailHeader);
        context.setVariable("title", title);
        context.setVariable("description", message);
        return templateEngine.process("template", context);
    }
}
