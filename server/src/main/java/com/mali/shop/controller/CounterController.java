package com.mali.shop.controller;

import com.mali.shop.model.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class CounterController {
    // Handles messages from /app/user-all. (Note the Spring adds the /app prefix for us). Endpoint where to send messages
    @MessageMapping("/chat")
    // Sends the return value of this method to /topic/user
    @SendTo("/topic/messages")
    public Message getContent(@Payload Message message) throws Exception{
        log.info("Received message {}", message);
        return message;
    }
}
