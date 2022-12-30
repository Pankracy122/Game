export const save = ({ cash, cash2, spins, spincost, x, y, z, time }) => {
  localStorage.setItem('cash', cash);
  localStorage.setItem('cash2', cash2);
  localStorage.setItem('spins', spins);
  localStorage.setItem('spincost', spincost);
  localStorage.setItem('x', x);
  localStorage.setItem('y', y);
  localStorage.setItem('z', z);
  localStorage.setItem('time', time);
};
