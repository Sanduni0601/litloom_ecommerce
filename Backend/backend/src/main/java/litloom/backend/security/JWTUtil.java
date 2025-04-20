package litloom.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTUtil {

    private final String secret = "your_jwt_secret_key_should_be_long_and_secure";
    private final Algorithm algorithm = Algorithm.HMAC256(secret);
    private final long expirationTime = 3600000;

    public String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .sign(algorithm);
    }

    public String verifyToken(String token) {
        try {
            DecodedJWT jwt = JWT.require(algorithm)
                    .build()
                    .verify(token);
            return jwt.getSubject();
        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Invalid or expired token");
        }
    }
    
    public boolean isTokenValid(String token, String email) {
        try {
            String subject = verifyToken(token);
            return subject.equals(email) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean isTokenExpired(String token) {
        try {
            DecodedJWT jwt = JWT.require(algorithm)
                    .build()
                    .verify(token);
            return jwt.getExpiresAt().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }
}