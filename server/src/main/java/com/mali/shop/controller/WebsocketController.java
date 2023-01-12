package com.mali.shop.controller;

import com.mali.shop.dto.ProductBidDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class WebsocketController {
    @Autowired
    private SimpMessagingTemplate template;

    @PostMapping("/send_update")
    public String sendUpdate(@RequestBody ProductBidDTO productWebSocketDTO) {
        template.convertAndSend("/product_update/" + productWebSocketDTO.getProductId(), productWebSocketDTO);
        return "Product updated";
    }

    @MessageMapping("/sendMessage")
    public void receiveMessage(@Payload ProductBidDTO textMessageDTO) {
        log.info("Receive message:" + textMessageDTO);
        // receive message from client
    }
}
