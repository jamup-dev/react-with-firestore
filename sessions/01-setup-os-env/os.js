const si = require('systeminformation');

si.cpu().then(cpuData => {
  console.log('CPU DATA');
  console.log('--------');
  console.log(JSON.stringify(cpuData, null, 4));
});
