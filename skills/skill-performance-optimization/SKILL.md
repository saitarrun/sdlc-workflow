---
name: skill-performance-optimization
description: Profile systems, identify bottlenecks, optimize code and infrastructure for speed, throughput, and resource efficiency.
version: 1.0.0
---

# Skill: Performance Optimization

Systematic approach to identifying and eliminating performance bottlenecks through profiling, benchmarking, and data-driven optimization.

## Process

1. **Establish Baselines** — Measure current performance (latency, throughput, memory, CPU)
2. **Profile** — Identify where time/resources are spent (flame graphs, traces, logs)
3. **Find Bottlenecks** — Rank by impact (80/20 rule: fix the top bottlenecks first)
4. **Optimize** — Apply targeted fixes (algorithm, caching, parallelization, resource allocation)
5. **Verify** — Re-measure to confirm improvements
6. **Prevent Regressions** — Add performance tests, monitoring, budgets

## Key Metrics

- **Latency**: p50, p95, p99 response time
- **Throughput**: Requests per second, transactions per minute
- **Resource Usage**: CPU %, memory consumption, disk I/O
- **Cost**: Infrastructure cost per unit work

## Common Bottlenecks

- Inefficient algorithms (O(n²) instead of O(n log n))
- Missing indexes on database queries
- Synchronous operations that should be async
- Excessive logging or serialization
- Memory leaks or inefficient data structures
- Network calls without batching/caching
- Single-threaded workloads that could parallelize

## Optimization Strategies

1. **Algorithmic**: Better algorithm selection
2. **Caching**: Reduce computation, add layer caching
3. **Async**: Non-blocking operations, parallelization
4. **Resource Allocation**: CPU, memory, connections tuning
5. **Infrastructure**: Scaling, CDN, geographic distribution
6. **Monitoring**: Real-time alerting on perf regressions

---

**Status**: Ready for profiling, optimization, and performance tuning
**Best for**: Latency reduction, throughput improvement, resource efficiency
