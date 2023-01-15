package com.example.emailserver.service;

import com.example.emailserver.dto.EmailDTO;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class KafkaConsumerService {
    @KafkaListener(topics = "email-topic")
    public void processMessage(ConsumerRecord<String, EmailDTO> record) {
        log.info("Received Message: " + record.value().getMessage());
        System.out.println("Received Message: " + record.value().getMessage());
    }
}
