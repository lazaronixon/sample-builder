const { program }  = require("commander");
const { WaveFile } = require("wavefile");
const { readFile, writeFile } = require("fs/promises");
const { sync } = require("glob");

program
  .version('0.0.1')
  .description("Prepare wav files to be sampled")
  .option("-r, --root <value>", "Add root note using filename")
  .option("-l, --loop <value>", "Add loop region using a value of 0-100")
  .parse();

const options = program.opts();

function addRootNote(fileName, fileWave, pattern) {
  const regexp   = new RegExp(pattern);
  const midiNote = parseInt(fileName.match(regexp).at(1));

  fileWave.smpl.chunkId = "smpl";
  fileWave.smpl.dwMIDIUnityNote = midiNote;
}

function addLoop(fileWave, percent) {
  const samples    = fileWave.getSamples();
  const loopLength = parseInt(samples.length * (percent / 100));

  fileWave.smpl.dwNumSampleLoops = 1;
  fileWave.smpl.loops = [{
    dwStart: samples.length - loopLength,
    dwEnd: samples.length
  }];
}

async function main() {
  const fileNames = sync("**/*.wav");

  for (const fileName of fileNames) {
    console.log(`Processing ${fileName}...`);

    const fileWave = new WaveFile(await readFile(fileName));

    if (options.root) {
      addRootNote(fileName, fileWave, options.root);
    }

    if (options.loop) {
      addLoop(fileWave, options.loop);
    }

    await writeFile(fileName, fileWave.toBuffer());
  };
}

main();
