package com.cyberhackathon.service;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class ChatBotService {
    private static final Map<String, String> databaseResponses = new HashMap<>();

    static {
        databaseResponses.put("case statuses", "Case statuses can be 'open' or 'closed'.");
        databaseResponses.put("list officers", "Officers: Rajesh Kumar, Priya, Suresh... Please check the User Management tab for more details.");
        databaseResponses.put("cases table fields", "Columns: case_number, title, description, status, officer_id, year, month.");
        databaseResponses.put("all criminals", "Criminals: Murugan, Rajasekar, Dinesh Kumar.");
        databaseResponses.put("evidence table fields", "Columns: case_id, evidence_type, description, added_by.");
        databaseResponses.put("list crime types", "Crime types include: Robbery, Murder, Kidnapping, Cyber Crime, Fraud.");
        databaseResponses.put("cases in Thoothukudi", "Active cases in Thoothukudi: Jewellery Store Burglary, Gang Murder in Muthiahpuram.");
        databaseResponses.put("most recent case", "The most recent case is 'Jewellery Store Burglary' on 2024-03-10.");
        databaseResponses.put("officer assigned to cyber crime", "Officer Manikandan is handling Cyber Crime investigations.");
        databaseResponses.put("criminal with alias Black Tiger", "Black Tiger is Karthik Subramanian, involved in robbery and extortion.");
        databaseResponses.put("case details TN2024002", "Case TN2024002: Kidnapping in Madurai, Status: Closed, Officer: Priya.");
        databaseResponses.put("evidence in case TN2024001", "CCTV Footage: Security footage showing five masked robbers.");
        databaseResponses.put("how many criminals are tracked", "Currently, 15 criminals are being tracked in the database.");
    }

    public String getChatBotResponse(String userInput) {
        userInput = userInput.toLowerCase().trim();

        // Detect polite/formal queries
        if (userInput.matches(".*(please|could you|kindly|may i|would you).*")) {
            return "I appreciate your polite query. Please ask me about cases, officers, criminals, or evidence.";
        }

        // Extract keywords and match with database
        for (String key : databaseResponses.keySet()) {
            if (userInput.contains(key)) {
                return databaseResponses.get(key);
            }
        }

        // Default response for unknown queries
        return "I'm sorry, but I can only assist with questions related to cases, officers, criminals, and evidence.";
    }
}
