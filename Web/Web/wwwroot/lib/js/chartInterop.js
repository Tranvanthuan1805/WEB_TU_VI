window.initDashboardChart = function(canvasId, labels, ordersData, revenueData) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
        console.log('[Chart] Canvas not found:', canvasId);
        return;
    }

    console.log('[Chart] Initializing with data:', { labels, ordersData, revenueData });

    if (window.adminTrafficChart) {
        window.adminTrafficChart.destroy();
    }

    window.adminTrafficChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Orders',
                data: ordersData,
                backgroundColor: '#1e3a8a',
                borderRadius: 4,
                borderSkipped: false,
                yAxisID: 'y',
            }, {
                label: 'Revenue (M)',
                data: revenueData,
                backgroundColor: '#22c55e',
                borderRadius: 4,
                borderSkipped: false,
                yAxisID: 'y1',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: { 
                legend: { display: true, position: 'bottom' } 
            },
            scales: {
                y: { 
                    beginAtZero: true, 
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: { color: 'rgba(197,197,211,0.1)' }
                },
                y1: {
                    beginAtZero: true,
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    ticks: { callback: function(value) { return value + 'M'; } }
                },
                x: { grid: { display: false } }
            }
        }
    });

    console.log('[Chart] Chart created successfully!');
};

window.destroyDashboardChart = function() {
    if (window.adminTrafficChart) {
        window.adminTrafficChart.destroy();
        window.adminTrafficChart = null;
    }
};