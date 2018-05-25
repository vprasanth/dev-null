const promisify = require('util').promisify;
const cp = require('child_process');
const args = require('args');
const execPromise = promisify(cp.exec);

args
  .option('remoteName', 'Remote ref name')
  .option('remoteUrl', 'The git url of remote destination')
  .option('ignore-tags', `Don't push tags`)
  .option('dry-run', 'Dry run only');

const flags = args.parse(process.argv);
const dryRun = flags.dryRun;

// @todo validate remote protocol is supported
if (!flags.remoteUrl) {
  console.log('Remote required.');
  args.showHelp();
}

console.log(flags);

async function run(options) {
  const command = `git push --dry-run ${options.remoteUrl} +refs/remotes/origin/*:refs/heads/* +refs/heads/*:refs/heads/*`;
  const { stdoout, stderr } = await execPromise(command);
  console.log(stdoout);
  console.log(stderr);
}

run(flags);

