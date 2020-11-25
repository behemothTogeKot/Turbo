const {exec} = require('child_process');

const {platform} = process;

const possibleValues = [
  'aix',
  'darwin',
  'freebsd',
  'linux',
  'openbsd',
  'sunos',
  'win32',
];

if (possibleValues.includes(platform)) {
  if (platform === 'darwin') {
    exec('npm run debugger-mac');
  } else if (platform === 'win32') {
    exec('npm run debugger-windows');
  } else {
    exec('npm run debugger-linux');
  }
} else {
  throw new Error('Unsupported platform');
}
