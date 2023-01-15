package com.mali.shop.controller;

import com.mali.shop.dto.EmailDTO;
import com.mali.shop.service.KafkaProducerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/kafka")
public final class KafkaController {
    private final String TOPIC = "email-topic";
    private final KafkaProducerService producerService;

    public KafkaController(KafkaProducerService producerService) {
        this.producerService = producerService;
    }

    @RequestMapping(value = "/send_product", method = RequestMethod.POST)
    public void sendMessage(@RequestBody EmailDTO emailDTO) {
        producerService.sendMessage(TOPIC, emailDTO);
    }
}