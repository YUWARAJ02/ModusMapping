package com.cyberhackathon.Controller;

import com.cyberhackathon.service.ChatBotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatBotController {

    @Autowired
    private ChatBotService chatBotService;

    @PostMapping("/ask")
    public Map<String, String> getResponse(@RequestBody Map<String, String> request) {
        String userInput = request.get("text").toLowerCase();
        Map<String, String> result = new HashMap<>();
        result.put("response", chatBotService.getChatBotResponse(userInput));
        return result;
    }
}
