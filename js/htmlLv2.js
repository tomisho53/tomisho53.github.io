const device_orientation_z = document.getElementById("device_orientation_z");
const device_orientation_x = document.getElementById("device_orientation_x");
const device_orientation_y = document.getElementById("device_orientation_y");

window.addEventListener("deviceorientation",(e) => {
  device_orientation_z.innerHTML = e.alpha;
  device_orientation_x.innerHTML = e.beta;
  device_orientation_y.innerHTML = e.gamma;
})