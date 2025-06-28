package com.email.writer.app;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        // Build the prompt
        String prompt = buildPrompt(emailRequest);

        // craft a request

        Map<String, Object> RequestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", new Object[] {
                                Map.of("text", prompt)
                        })
                });

        // Do request and get response

        String response = webClient.post()
                .uri(geminiApiUrl + "?key=" + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(RequestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // extractreturn response

        return extractResponseContent(response);

    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
        } catch (Exception e) {
            return "Error processing request: " + e.getMessage();
        }
    }

    // private String buildPrompt(EmailRequest emailRequest) {
    // StringBuilder prompt = new StringBuilder();
    // prompt.append(
    // "Generate a professional email reply for the following email content .Please
    // dont generate a subject line.");
    // if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
    // prompt.append("Use").append(emailRequest.getTone()).append("tone.");
    // }
    // prompt.append("\nOriginal email: \n").append(emailRequest.getEmailContent());
    // return prompt.toString();
    // }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();

        // 1. Clear instruction to generate an email reply
        prompt.append("Please write an email reply to the following original email. ");

        // 2. Incorporate the tone if provided
        if (emailRequest.getTone() != null && !emailRequest.getTone().trim().isEmpty()) {
            prompt.append("The reply should be in a ").append(emailRequest.getTone().toLowerCase()).append(" tone. ");
        }

        // 3. Instruction to omit a subject line
        prompt.append("Do not include a subject line.\n\n");

        // 4. Clearly delineate the original email content
        prompt.append("Original Email Content:\n")
                .append(emailRequest.getEmailContent());

        return prompt.toString();
    }
}
