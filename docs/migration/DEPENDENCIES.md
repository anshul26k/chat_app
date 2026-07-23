# Dependency Upgrade Plan — acme-banking-platform

| Dependency | Current | Recommended | Reason | Risk |
|---|---|---|---|---|
| `org.springframework.boot:spring-boot-starter` | 2.7.18 | **3.5.4** | Java 21 & Jakarta EE 9+ support | high |
| `org.springframework.boot:spring-boot-starter-web` | 2.7.18 | **3.5.4** | Servlet 6 (jakarta.servlet.*) | high |
| `org.springframework.boot:spring-boot-starter-data-jpa` | 2.7.18 | **3.5.4** | Hibernate 6.6 + jakarta.persistence | high |
| `org.springframework.security:spring-security-web` | 5.7.11 | **6.4.2** | Lambda DSL, no WebSecurityConfigurerAdapter | high |
| `com.fasterxml.jackson.core:jackson-databind` | 2.13.5 | **2.18.2** | CVE-2022-42003 fix & records support | medium |
| `org.hibernate:hibernate-core` | 5.6.15.Final | **6.6.5.Final** | jakarta.persistence & new dialect API | high |
| `org.projectlombok:lombok` | 1.18.24 | **1.18.36** | JDK 21 compatibility | low |
| `org.mapstruct:mapstruct` | 1.5.3.Final | **1.6.3** | Records + JDK 21 | low |
| `org.junit.jupiter:junit-jupiter` | 5.8.2 | **5.11.4** | Parallel + parameterized improvements | low |
| `io.jsonwebtoken:jjwt-api` | 0.11.5 | **0.12.6** | JDK 21, virtual thread safe | medium |
| `com.h2database:h2` | 2.1.214 | **2.3.232** | Java 21 & CVE fixes | medium |
| `org.mockito:mockito-core` | 4.11.0 | **5.14.2** | Java 21 bytecode support | medium |
| `io.micrometer:micrometer-core` | 1.9.17 | **1.14.2** | SB3 observation API | medium |
| `com.zaxxer:HikariCP` | 4.0.3 | **6.2.1** | JDK 17+ baseline | low |