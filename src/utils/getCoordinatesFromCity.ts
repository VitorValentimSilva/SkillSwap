export async function getCoordinatesFromCity(
  city: string,
  country: string
): Promise<{ lat: number; lon: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      city + ", " + country
    )}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "NearYouApp/1.0 (vitorvalentin840@gmail.com)",
      },
    });

    const data = await response.json();

    if (data.length === 0) {
      console.warn("Cidade não encontrada:", city);
      return null;
    }

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Erro ao buscar coordenadas da cidade:", error);
    return null;
  }
}
