const message = (name) => {
    console.log(`Hello ${name}`);
}
const cpuInformation = process.memoryUsage();
 
console.log(cpuInformation);
message('JavaScript');