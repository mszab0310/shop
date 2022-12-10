package com.mali.shop.controller;

import com.mali.shop.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CounterController {


    @MessageMapping("/user-all")
    @SendTo("/topic/user")
    public Message getContent(@Payload Message message) throws Exception{
        Thread.sleep(1000);
        return message;
    }
}
