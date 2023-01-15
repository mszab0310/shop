package com.mali.shop.controller;

import com.mali.shop.dto.ProductBidDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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

    @PostMapping(value = "/send_update", consumes = MediaType.APPLICATION_JSON_VALUE)
    public String sendUpdate(@RequestBody ProductBidDTO productWebSocketDTO) {
        log.info("Recived post request with bid {}", productWebSocketDTO.getProductId());
        template.convertAndSend("/product_update/" + productWebSocketDTO.getProductId(), productWebSocketDTO);
        return "Product updated";
    }

    @MessageMapping("/product_update/{productId}")
    public void receiveMessage(@Payload ProductBidDTO textMessageDTO) {
        log.info("Receive message:" + textMessageDTO);
        // receive message from client
    }
}
