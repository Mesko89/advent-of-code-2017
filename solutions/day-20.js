function parseParticles(inputLines) {
  const particleRx = /^p=<\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*>,\s*v=<\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*>,\s*a=<\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*>$/i;
  function toParticle(line) {
    const [_, px, py, pz, vx, vy, vz, ax, ay, az] = line.match(particleRx);
    return {
      position: [parseInt(px), parseInt(py), parseInt(pz)],
      velocity: [parseInt(vx), parseInt(vy), parseInt(vz)],
      acceleration: [parseInt(ax), parseInt(ay), parseInt(az)]
    };
  }
  return inputLines.map(toParticle);
}

// function distanceAtTime(particle, time) {
//   return particle.position.reduce((total, position, index) => {
//     return total + 
//       Math.abs(
//         position + 
//         ((particle.velocity[index] + particle.acceleration[index]) * (time - 1)) + 
//         (particle.acceleration[index] * (time - 1) * (time - 1) / 2)
//       );
//   }, 0);
// }

function arrayAdd(arr1, arr2) {
  return arr1.map((v, i) => v + arr2[i]);
}

function arrayEq(arr1, arr2) {
  return arr1.every((v, i) => v === arr2[i]);
}

function distanceAtTime(particle, time) {
  let position = [...particle.position];
  let velocity = [...particle.velocity];
  while (time--) {
    velocity = arrayAdd(velocity, particle.acceleration);
    position = arrayAdd(position, velocity);
  }
  return position.reduce((total, value) => total + Math.abs(value), 0);
}

function getClosestParticleLongTerm(particles) {
  let closestDistance = distanceAtTime(particles[0], 1e3);
  const distances = particles.map(p => distanceAtTime(p, 1e3));
  const min = Math.min(...distances);
  return distances.indexOf(min);
}

function resolveConflicts(particles) {
  let totalTicksSimulated = 1000;
  while (totalTicksSimulated--) {
    particles.forEach((particle) => {
      particle.velocity = arrayAdd(particle.velocity, particle.acceleration);
      particle.position = arrayAdd(particle.position, particle.velocity);
    });
    particles = particles.filter((particle, i) => {
      const similarParticles = particles.filter(p => arrayEq(p.position, particle.position));
      if (similarParticles.length > 1) return false;
      return true;
    });
  }
  return particles;
}

module.exports = {
  part1: (inputLines) => {
    const particles = parseParticles(inputLines);
    return getClosestParticleLongTerm(particles);
  },
  part2: (inputLines) => {
    let particles = parseParticles(inputLines);
    return resolveConflicts(particles).length;
  }
}
