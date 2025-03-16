const getCoordinates = async (place) => {
    const apiKey = "AIzaSyDgKht7QFWBJZs8keoLq3E31vgfC8orOzE";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(place)}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error("Location not found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };
  