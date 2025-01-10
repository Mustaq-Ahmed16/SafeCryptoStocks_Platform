package in.projectjwt.main.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

@Service
public class TokenBlacklistService {
	// Example: Use an in-memory or external storage like Redis or a database
    private Set<String> blacklistedTokens = new HashSet<>();

    public void addToBlacklist(String token) {
        // Here you can add the token to your database or in-memory cache (e.g., Redis)
        blacklistedTokens.add(token);
    }

    public boolean isTokenBlacklisted(String token) {
        // Check if the token is blacklisted
        return blacklistedTokens.contains(token);
    }

}
