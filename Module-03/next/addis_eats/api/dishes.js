// Fetch all dishes
export async function getDishes(signal) {
    try {
        // Artifical delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // const res = await fetch("https://addis-eats-backend.onrender.com/menu/", { signal });
        const res = await fetch("/dishes.json", { signal });
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const json = await res.json();
        return json.data ?? [];

    } catch (err) {
        if (err.name === "AbortError") return [];
        console.log(`Failed to fetch dishes: ${err.message}`);
        throw err;
    }
}

// Fetch special dishes
export async function getSpecials(signal) {
    try {
        // Artifical delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // const res = await fetch("https://addis-eats-backend.onrender.com/menu/specials", { signal });
        const res = await fetch("/specials.json", { signal });
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const json = await res.json();
        return json.data ?? [];
        
    } catch (err) {
        if (err.name === "AbortError") return [];
        console.log(`Failed to fetch special dishes: ${err.message}`);
        throw err;
    }
}