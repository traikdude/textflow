/**
 * @fileoverview Monitoring and Health Check System
 */

/**
 * Runs a system health check and returns results.
 * Can be called manually or via timed trigger.
 * @return {Object} Health check results
 */
function runHealthCheck() {
  const results = {
    timestamp: new Date(),
    tests: [],
    status: 'UNKNOWN'
  };
  
  // Test 1: Basic Runtime Execution
  try {
    const start = new Date().getTime();
    // Perform a lightweight operation
    const test = Math.random() * 1000;
    const duration = new Date().getTime() - start;
    
    results.tests.push({
      name: 'Runtime Execution',
      status: 'PASS',
      message: `Execution successful (${duration}ms)`
    });
  } catch (error) {
    results.tests.push({
      name: 'Runtime Execution',
      status: 'FAIL',
      message: error.toString()
    });
  }
  
  // Test 2: External Connectivity (Google)
  try {
    const response = UrlFetchApp.fetch('https://www.google.com', {
      muteHttpExceptions: true
    });
    const code = response.getResponseCode();
    
    results.tests.push({
      name: 'API Connectivity',
      status: code === 200 ? 'PASS' : 'FAIL',
      message: `HTTP ${code}`
    });
  } catch (error) {
    results.tests.push({
      name: 'API Connectivity',
      status: 'FAIL',
      message: error.toString()
    });
  }
  
  // Determine Overall Status
  const failures = results.tests.filter(t => t.status === 'FAIL');
  results.status = failures.length === 0 ? 'HEALTHY' : 'DEGRADED';
  
  console.log(JSON.stringify(results, null, 2));
  return results;
}
