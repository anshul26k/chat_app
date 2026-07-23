# Migration Plan — acme-banking-platform

_Generated 2026-07-23 10:41 UTC by DevPilot AI._

| # | Step | Duration | Automation |
|---|------|---------:|-----------:|
|  1 | Upgrade Java 11 → 21 | 8.0h | 90% |
|  2 | Upgrade Spring Boot 2.7 → 3.5 | 12.0h | 75% |
|  3 | Replace javax → jakarta | 16.0h | 95% |
|  4 | Upgrade dependencies | 24.0h | 50% |
|  5 | Refactor deprecated APIs | 32.0h | 40% |
|  6 | Generate / update tests | 40.0h | 80% |
|  7 | Validate build | 16.0h | 60% |
|  8 | Security validation | 16.0h | 50% |
|  9 | Performance validation | 24.0h | 30% |
| 10 | Generate Pull Request | 8.0h | 100% |

## Step 1 · Upgrade Java 11 → 21

**Duration:** 8.0h  ·  **Automation:** 90%

Update pom.xml <java.version> to 21 and configure Maven Compiler Plugin to use release 21. Update CI/CD runners and Jenkins/GitHub Action environments to execute using the OpenJDK 21 distribution.

**Validation:** ``mvn -T 1C clean compile` succeeds on a clean environment using JDK 21.`

## Step 2 · Upgrade Spring Boot 2.7 → 3.5

**Duration:** 12.0h  ·  **Automation:** 75%

Update the Spring Boot parent version to 3.5.x and migrate application configuration files to reflect renamed properties. Use the Spring Boot Migrator (SBM) tool to identify property changes across the 12 config files.

**Validation:** `Application context starts without `ConfigurationPropertyName` errors.`

## Step 3 · Replace javax → jakarta

**Duration:** 16.0h  ·  **Automation:** 95%

Perform bulk namespace migration for 222 imports using OpenRewrite's `jakarta-ee-10` recipe. This replaces javax.persistence, javax.servlet, and javax.validation with their jakarta equivalents across 353 files.

**Validation:** `Zero occurrences of `import javax.persistence.*` or `import javax.servlet.*` in the codebase.`

## Step 4 · Upgrade dependencies

**Duration:** 24.0h  ·  **Automation:** 50%

Update Hibernate to 6.x, Spring Security to 6.x, and Jackson to 2.17+. Resolve breaking changes in Hibernate Dialects and replace deprecated Spring Security DSL configurations.

**Validation:** ``mvn dependency:analyze` shows no version conflicts and Hibernate validates the 60 entities against the schema.`

## Step 5 · Refactor deprecated APIs

**Duration:** 32.0h  ·  **Automation:** 40%

Manually refactor the 34 identified deprecated API hits, replacing Date/Calendar with java.time and removing legacy Vector/Hashtable usages. Address Thread.stop() and other incompatible JDK 21 changes.

**Validation:** `Compiler warnings for deprecated APIs reduced to zero in 80,108 lines of code.`

## Step 6 · Generate / update tests

**Duration:** 40.0h  ·  **Automation:** 80%

Migrate JUnit 4.13.2 to JUnit 5.10 using OpenRewrite's `junit5-migration` recipe and update Mockito to version 5.x. Ensure 62 services and 30 controllers have updated test runner annotations.

**Validation:** ``mvn test` execution shows all tests passing with the JUnit Jupiter engine.`

## Step 7 · Validate build

**Duration:** 16.0h  ·  **Automation:** 60%

Execute the full Maven lifecycle including integration tests and checkstyle. Fix the 15 breaking changes identified in the high-complexity components of the banking platform.

**Validation:** ``mvn verify` completes successfully with all 218 affected files integrated.`

## Step 8 · Security validation

**Duration:** 16.0h  ·  **Automation:** 50%

Perform a full audit of the 30 controllers and security filters using Spring Security 6's new authorization manager. Run OWASP Dependency Check to ensure no new vulnerabilities were introduced.

**Validation:** `Security scans return zero 'High' or 'Critical' vulnerabilities; authentication/authorization flows pass.`

## Step 9 · Performance validation

**Duration:** 24.0h  ·  **Automation:** 30%

Enable Virtual Threads using `spring.threads.virtual.enabled=true` and benchmark the 62 services. Monitor the 80k LOC system for memory leaks or thread pinning under JDK 21.

**Validation:** `Throughput meets or exceeds Java 11 benchmarks with lower memory overhead per concurrent request.`

## Step 10 · Generate Pull Request

**Duration:** 8.0h  ·  **Automation:** 100%

Consolidate changes from 353 files into a final migration PR, including updated documentation for the new tech stack. Final peer review and squash-merge to the main branch.

**Validation:** `Pull Request successfully merged and successfully deployed to the staging environment.`
