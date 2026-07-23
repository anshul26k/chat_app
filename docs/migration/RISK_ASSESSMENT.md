# Risk Assessment — acme-banking-platform

- **Overall:** 100 / 100  ·  Level: **High**
- **Breaking change:** 71
- **Dependency:** 100
- **Security:** 41
- **Performance:** 50
- **Rollback complexity:** 31

## Deprecated APIs detected

- `Thread.stop()` — 5 occurrence(s). Use interrupt() + volatile flag
- `Anonymous inner Runnable` — 2 occurrence(s). Use lambda / Runnable::method
- `Traditional switch statement` — 4 occurrence(s). Use switch expressions with pattern matching
- `java.util.Calendar` — 5 occurrence(s). Prefer java.time.ZonedDateTime
- `java.util.Vector` — 6 occurrence(s). Use ArrayList or CopyOnWriteArrayList
- `java.util.Date` — 3 occurrence(s). Prefer java.time.Instant / LocalDateTime
- `java.util.Hashtable` — 5 occurrence(s). Use ConcurrentHashMap
- `WebSecurityConfigurerAdapter` — 4 occurrence(s). Use SecurityFilterChain bean