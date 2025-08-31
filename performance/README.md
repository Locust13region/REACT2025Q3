# React App Performance Profiling

## Add column

Before

- **commit 1**
- commit: 2.8s
- render: 873.1ms
  ![flame](./docs/before/add%20col%201%20flame.jpg)
  ![ranked](./docs/before/add%20col%201%20ranked.jpg)
- **commit 2**
- commit: 6.4s
- render: 1008.7ms
  ![flame](./docs/before/add%20col%202%20flame.jpg)
  ![ranked](./docs/before/add%20col%202%20ranked.jpg)

After

- **commit 1**
- commit: 2.3s
- render: 162ms
  ![flame](./docs/after/add%20col%201%20flame.jpg)
  ![ranked](./docs/after/add%20col%201%20rank.jpg)
- **commit 2**
- commit: 5s
- render: 647.3ms
  ![flame](./docs/after/add%20col%202%20flame.jpg)
  ![ranked](./docs/after/add%20col%202%20rank.jpg)

## Change year

Before

- **commit 1**
- commit: 2.7s
- render: 841ms
  ![flame](./docs/before/cng%20year%201%20fl.jpg)
  ![ranked](./docs/before/cng%20year%201%20nank.jpg)

After

- **commit 1**
- commit: 5.7s
- render: 771.1ms
  ![flame](./docs/after/cng%20year%201%20fl.jpg)
  ![ranked](./docs/after/cng%20year%201%20rank.jpg)

## Select country

Before

- **commit 1**
- commit: 1.6s
- render: 151ms
  ![flame](./docs/before/sel%20cntr%201%20fl.jpg)
  ![ranked](./docs/before/sel%20cntr%201%20rank.jpg)
- **commit 2**
- commit: 9.7s
- render: 27.5ms
  ![flame](./docs/before/sel%20cntr%202%20fl.jpg)
  ![ranked](./docs/before/sel%20cntr%202%20rank.jpg)

After

- **commit 1**
- commit: 2.2s
- render: 143.5ms
  ![flame](./docs/after/sel%20cntr%201%20fl.jpg)
  ![ranked](./docs/after/sel%20cntr%201%20rank.jpg)
- **commit 2**
- commit: 9.9s
- render: 33.9ms
  ![flame](./docs/after/sel%20cntr%202%20fl.jpg)
  ![ranked](./docs/after/sel%20cntr%202%20rank.jpg)
