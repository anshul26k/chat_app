# Code Transformations — acme-banking-platform

## 1. javax.persistence → jakarta.persistence

- **Category:** Namespace migration
- **Recipe:** `org.openrewrite.java.migrate.jakarta.JavaxToJakarta`
- **Confidence:** 99%

**Reason:** Spring Boot 3.x requires Jakarta EE 9/10 namespaces for persistence and validation providers.

**Before:**

```java
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "accounts")
public class Account {
    @Id
    private Long id;
    @NotNull
    private String accountNumber;
}
```

**After:**

```java
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "accounts")
public class Account {
    @Id
    private Long id;
    @NotNull
    private String accountNumber;
}
```

## 2. WebSecurityConfigurerAdapter → SecurityFilterChain

- **Category:** API replacement
- **Recipe:** `org.openrewrite.java.spring.security6.UseSpringSecurity6RestrictedConfigurations`
- **Confidence:** 95%

**Reason:** WebSecurityConfigurerAdapter is removed in Spring Security 6; component-based configuration is now mandatory.

**Before:**

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/api/v1/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated()
            .and().httpBasic();
    }
}
```

**After:**

```java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
            .anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
```

## 3. SimpleDateFormat → DateTimeFormatter

- **Category:** API replacement
- **Recipe:** `org.openrewrite.java.migrate.time.UseDateTimeFormatter`
- **Confidence:** 90%

**Reason:** SimpleDateFormat is not thread-safe and belongs to the legacy Date API; DateTimeFormatter is immutable and thread-safe.

**Before:**

```java
public String formatDate(Date date) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    return sdf.format(date);
}
```

**After:**

```java
private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
    .withZone(ZoneId.systemDefault());

public String formatDate(Instant instant) {
    return FORMATTER.format(instant);
}
```

## 4. Traditional switch → Switch expression with pattern matching

- **Category:** Language feature
- **Recipe:** `org.openrewrite.java.migrate.net.MigrateToSwitchExpressions`
- **Confidence:** 98%

**Reason:** Switch expressions provide exhaustive checking and more concise syntax, leveraging Java 21 features.

**Before:**

```java
public double calculateFee(Account account) {
    switch (account.getType()) {
        case SAVINGS: return 0.0;
        case CHECKING: return 5.0;
        case PREMIUM: return 2.5;
        default: throw new IllegalArgumentException();
    }
}
```

**After:**

```java
public double calculateFee(Account account) {
    return switch (account.getType()) {
        case SAVINGS -> 0.0;
        case CHECKING -> 5.0;
        case PREMIUM -> 2.5;
    };
}
```

## 5. DTO class → Java record

- **Category:** Language feature
- **Recipe:** `org.openrewrite.java.migrate.UseRecords`
- **Confidence:** 92%

**Reason:** Records reduce boilerplate for data carriers, automatically providing constructors, accessors, equals, and hashCode.

**Before:**

```java
public final class TransactionResponse {
    private final String txId;
    private final BigDecimal amount;
    public TransactionResponse(String txId, BigDecimal amount) {
        this.txId = txId;
        this.amount = amount;
    }
    public String getTxId() { return txId; }
    public BigDecimal getAmount() { return amount; }
}
```

**After:**

```java
public record TransactionResponse(String txId, BigDecimal amount) {}
```

## 6. FixedThreadPool → Virtual Thread Executor

- **Category:** Performance
- **Recipe:** `org.openrewrite.java.migrate.net.UseVirtualThreadExecutor`
- **Confidence:** 85%

**Reason:** Virtual threads significantly reduce memory overhead for I/O bound banking operations compared to platform thread pools.

**Before:**

```java
private final ExecutorService executor = Executors.newFixedThreadPool(100);

public void processBatch() {
    executor.submit(() -> reconciliationService.sync());
}
```

**After:**

```java
private final ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

public void processBatch() {
    executor.submit(() -> reconciliationService.sync());
}
```
