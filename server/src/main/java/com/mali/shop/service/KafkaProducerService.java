package com.mali.shop.service;

import com.mali.shop.dto.EmailDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public final class KafkaProducerService {
    private static final Logger logger = LoggerFactory.getLogger(KafkaProducerService.class);

    private final KafkaTemplate<String, EmailDTO> kafkaTemplate;
    private final String TOPIC = "email-topic";

    public KafkaProducerService(KafkaTemplate<String, EmailDTO> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(String topic, EmailDTO emailDTO) {
        kafkaTemplate.send(topic, emailDTO);
        logger.info(String.format("$$$$ => Producing message to: %s", emailDTO.getEmail()));
    }
}
