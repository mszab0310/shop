package com.example.emailserver.service;

import com.example.emailserver.dto.EmailDTO;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class KafkaConsumerService {

    @Autowired
    private EmailService emailService;
    @KafkaListener(topics = "email-topic")
    public void processMessage(ConsumerRecord<String, EmailDTO> record) {
        log.info("Received Message: " + record.value().getMessage());
        System.out.println("Received Message: " + record.value().getMessage());
        String body =
                "Please click the following link in order to reset your email! \n" +
                "If you did not request a password reset, please do not click it : \n" + record.value().getMessage();
        emailService.sendEmail(record.value().getEmail(),"Password Reset", body);
    }
}
