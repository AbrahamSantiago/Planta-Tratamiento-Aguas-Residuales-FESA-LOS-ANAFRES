const registros = [];

function calcularDiferencias(n0, nf, t0, tf) {
  const difniv = n0 - nf;
  const h0 = new Date(`1970-01-01T${t0}`);
  const hf = new Date(`1970-01-01T${tf}`);
  const difms = hf - h0;
  const difmin = Math.floor(difms / 60000);
  const difh = Math.floor(difmin / 60);
  return { difniv, difmin, difh };
}
function mostrarBoton() {
  const fileInput = document.getElementById("fileInput");
  const btnSubir = document.getElementById("btnSubir");
  if (fileInput.files.length > 0) {
    btnSubir.style.display = "inline-block";
  } else {
    btnSubir.style.display = "none";
  }
}
function agregarRegistro() {
  const fecha = document.getElementById("fecha").value;
  const n0 = parseFloat(document.getElementById("niv0").value);
  const nf = parseFloat(document.getElementById("nivf").value);
  const volg = parseFloat(document.getElementById("volg").value);
  const t0 = document.getElementById("t0").value;
  const tf = document.getElementById("tf").value;
  const volagr = parseFloat(document.getElementById("volagr").value);
  const vtotal = parseFloat(document.getElementById("vtotal").value);

  const { difniv, difmin, difh } = calcularDiferencias(n0, nf, t0, tf);

  document.getElementById("difniv").value = difniv;
  document.getElementById("difh").value = difh;
  document.getElementById("difmin").value = difmin;

  const nuevoRegistro = { fecha, n0, nf, difniv, volg, t0, tf, difh, difmin, volagr, vtotal };
  registros.push(nuevoRegistro);
  actualizarTabla();
  actualizarGrafica();
}

function actualizarTabla() {
  const tbody = document.querySelector("#tablaRegistros tbody");
  tbody.innerHTML = "";
  registros.forEach(reg => {
    const fila = `<tr>
      <td>${reg.fecha}</td><td>${reg.n0}</td><td>${reg.nf}</td><td>${reg.difniv}</td><td>${reg.volg}</td><td>${reg.t0}</td><td>${reg.tf}</td><td>${reg.difh}</td><td>${reg.difmin}</td><td>${reg.volagr}</td><td>${reg.vtotal}</td>
    </tr>`;
    tbody.innerHTML += fila;
  });
}

function actualizarGrafica() {
  const fechas = registros.map(r => r.fecha);
  const niveles = registros.map(r => r.n0);
  const ctx = document.getElementById('grafica').getContext('2d');
  if (window.grafica) window.grafica.destroy();
  window.grafica = new Chart(ctx, {
    type: 'line',
    data: {
      labels: fechas,
      datasets: [{
        label: 'Nivel Inicial (Niv 0)',
        data: niveles,
        borderWidth: 2,
        fill: false,
        borderColor: 'blue'
      }]
    }
  });
}