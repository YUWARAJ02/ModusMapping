package com.cyberhackathon.service;

import com.cyberhackathon.entity.Case;
import com.cyberhackathon.entity.Criminal;
import com.cyberhackathon.entity.Evidence;
import com.cyberhackathon.repository.jpa.CaseRepository;
import com.cyberhackathon.repository.jpa.CriminalRepository;
import com.cyberhackathon.repository.jpa.EvidenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChatBotService {

    @Autowired
    private CaseRepository caseRepository;

    @Autowired
    private CriminalRepository criminalRepository;

    @Autowired
    private EvidenceRepository evidenceRepository;

    public String getChatBotResponse(String userInput) {
        if (userInput == null || userInput.isEmpty()) {
            return "Please ask me something related to cases, criminals, or evidence.";
        }

        userInput = userInput.toLowerCase().trim();

        // ✅ Handle greetings
        if (containsAny(userInput, Arrays.asList("hello", "hi", "greetings", "hey"))) {
            return "Hello! 👮‍♂️ How can I assist you with crime data today?";
        }

        // ✅ Keyword-based logic

        // Recent case info
        if (containsAll(userInput, Arrays.asList("recent", "case"))) {
            Optional<Case> latest = caseRepository.findTopByOrderByIdDesc();
            return latest.map(this::formatCase).orElse("No recent case found.");
        }

        // Criminals list
        if (containsAny(userInput, Arrays.asList("criminal", "criminals", "accused"))) {
            List<Criminal> criminals = criminalRepository.findAll();
            if (criminals.isEmpty()) return "No criminals found.";
            return "List of criminals: " + criminals.stream().limit(5)
                    .map(Criminal::getName)
                    .reduce((a, b) -> a + ", " + b).orElse("No names.");
        }

        // Evidence summary
        if (containsAny(userInput, Arrays.asList("evidence", "proof", "supporting documents"))) {
            List<Evidence> evidences = evidenceRepository.findAll();
            if (evidences.isEmpty()) return "No evidence found.";
            Evidence e = evidences.get(0);
            return "Sample evidence: " + e.getEvidenceType() + " - " + e.getDescription();
        }

        // Case status
        if (containsAll(userInput, Arrays.asList("case", "status"))) {
            Map<Case.CaseStatus, Long> stats = new HashMap<>();
            for (Case.CaseStatus status : Case.CaseStatus.values()) {
                stats.put(status, caseRepository.countByStatus(status));
            }
            return "📊 Case Status:\n" + stats.entrySet().stream()
                    .map(entry -> entry.getKey() + ": " + entry.getValue())
                    .reduce((a, b) -> a + "\n" + b).orElse("No data");
        }

        return "🤖 I'm still learning. Please ask me about cases, criminals, or evidence.";
    }

    private boolean containsAny(String input, List<String> keywords) {
        return keywords.stream().anyMatch(input::contains);
    }

    private boolean containsAll(String input, List<String> keywords) {
        return keywords.stream().allMatch(input::contains);
    }

    private String formatCase(Case c) {
        return "🕵️‍♂️ Most recent case: " + c.getTitle() + " ("
                + c.getCaseNumber() + "), Status: " + c.getStatus()
                + ", Officer: " + c.getOfficer().getUser().getName();
    }
}
