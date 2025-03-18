// Configuración del contenido dinámico
document.getElementById("header").innerHTML = `
  <h1>Visualización de Datos en Tiempo Real</h1>
`;

// Simulación de datos (en lugar de obtenerlos desde PHP)
const datos = {
  fechas: ["2024-02-01", "2024-02-02", "2024-02-03"],
  niveles: [30, 28, 32],
  cantidades: [500, 520, 480],
};

// Crear el gráfico
const ctx = document.getElementById("grafico").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: datos.fechas,
    datasets: [
      {
        label: "Niveles de Contaminantes",
        data: datos.niveles,
        borderColor: "red",
        fill: false,
      },
      {
        label: "Cantidad de Agua Tratada",
        data: datos.cantidades,
        borderColor: "blue",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});