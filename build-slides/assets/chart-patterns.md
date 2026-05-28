# Chart.js Patterns

Reusable Chart.js code patterns for common data visualizations in slides.

---

## Bar Chart - Comparison

**Use for:** Comparing values across categories

```html
<canvas id="barChart" width="600" height="400"></canvas>
<script>
const ctx = document.getElementById('barChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Revenue ($M)',
      data: [12, 19, 15, 22],
      backgroundColor: '#2563eb',
      borderRadius: 8
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Quarterly Revenue',
        font: { size: 20 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { font: { size: 14 } }
      },
      x: {
        ticks: { font: { size: 14 } }
      }
    }
  }
});
</script>
```

---

## Bar Chart - Grouped

**Use for:** Comparing multiple metrics across categories

```html
<canvas id="groupedBarChart" width="600" height="400"></canvas>
<script>
const ctx = document.getElementById('groupedBarChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 78, 85, 92],
        backgroundColor: '#2563eb'
      },
      {
        label: 'Target',
        data: [70, 75, 80, 90],
        backgroundColor: '#64748b'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Sales vs Target',
        font: { size: 20 }
      }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});
</script>
```

---

## Line Chart - Trend

**Use for:** Showing change over time

```html
<canvas id="lineChart" width="600" height="400"></canvas>
<script>
const ctx = document.getElementById('lineChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [{
      label: 'Active Users',
      data: [1200, 1900, 2400, 3100, 4200, 5500],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 5,
      pointBackgroundColor: '#2563eb'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'User Growth',
        font: { size: 20 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { font: { size: 14 } }
      }
    }
  }
});
</script>
```

---

## Line Chart - Multiple Series

**Use for:** Comparing trends across groups

```html
<canvas id="multiLineChart" width="600" height="400"></canvas>
<script>
const ctx = document.getElementById('multiLineChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Product A',
        data: [30, 45, 52, 68, 75, 85],
        borderColor: '#2563eb',
        tension: 0.4,
        borderWidth: 2
      },
      {
        label: 'Product B',
        data: [20, 35, 48, 55, 70, 90],
        borderColor: '#0ea5e9',
        tension: 0.4,
        borderWidth: 2
      },
      {
        label: 'Product C',
        data: [15, 25, 30, 42, 58, 72],
        borderColor: '#64748b',
        tension: 0.4,
        borderWidth: 2
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Product Performance',
        font: { size: 20 }
      }
    }
  }
});
</script>
```

---

## Doughnut Chart - Composition

**Use for:** Showing parts of a whole

```html
<canvas id="doughnutChart" width="400" height="400"></canvas>
<script>
const ctx = document.getElementById('doughnutChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Direct', 'Organic Search', 'Social', 'Referral', 'Email'],
    datasets: [{
      data: [35, 25, 20, 12, 8],
      backgroundColor: [
        '#2563eb',
        '#0ea5e9',
        '#64748b',
        '#94a3b8',
        '#cbd5e1'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: { font: { size: 14 } }
      },
      title: {
        display: true,
        text: 'Traffic Sources',
        font: { size: 20 }
      }
    }
  }
});
</script>
```

---

## Horizontal Bar Chart - Ranking

**Use for:** Showing top items or rankings

```html
<canvas id="horizontalBarChart" width="600" height="400"></canvas>
<script>
const ctx = document.getElementById('horizontalBarChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
    datasets: [{
      label: 'Customer Requests',
      data: [145, 132, 98, 76, 54],
      backgroundColor: '#2563eb',
      borderRadius: 6
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Most Requested Features',
        font: { size: 20 }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { font: { size: 14 } }
      }
    }
  }
});
</script>
```

---

## Stacked Bar Chart - Parts Over Time

**Use for:** Showing composition changes over time

```html
<canvas id="stackedBarChart" width="600" height="400"></canvas>
<script>
const ctx = document.getElementById('stackedBarChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Enterprise',
        data: [300, 350, 420, 480],
        backgroundColor: '#2563eb'
      },
      {
        label: 'Professional',
        data: [200, 240, 280, 320],
        backgroundColor: '#0ea5e9'
      },
      {
        label: 'Starter',
        data: [100, 110, 130, 150],
        backgroundColor: '#64748b'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Revenue by Plan Type',
        font: { size: 20 }
      }
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true }
    }
  }
});
</script>
```

---

## Theme Integration

Apply theme colors to charts:

### Modern Theme
```javascript
const colors = {
  primary: '#2563eb',
  accent: '#0ea5e9',
  secondary: '#64748b'
};
```

### Classic Theme
```javascript
const colors = {
  primary: '#1e40af',
  accent: '#d97706',
  secondary: '#475569'
};
```

### Bold Theme
```javascript
const colors = {
  primary: '#dc2626',
  accent: '#f59e0b',
  secondary: '#171717'
};
```

---

## Best Practices

1. **Limit data points** - Max 8 categories for bars, 10 points for lines
2. **Use color consistently** - Same metric = same color across slides
3. **Start at zero** - For bar/column charts showing quantities
4. **Label clearly** - Add units ($, %, etc.) to axis labels
5. **Simplify** - Remove gridlines and decorations that don't add value
6. **Size appropriately** - Charts should fill 50-70% of slide space
7. **Consider colorblind** - Use patterns or labels in addition to color

---

## Chart Selection Guide

| Data type | Chart type |
|-----------|-----------|
| Compare categories | Bar (vertical) |
| Compare many items | Bar (horizontal) |
| Show ranking | Bar (horizontal, sorted) |
| Trend over time | Line |
| Compare multiple trends | Line (multiple) |
| Parts of a whole | Doughnut or Pie |
| Composition over time | Stacked bar |
| Two variables | Scatter plot |
| Distribution | Histogram |
