export async function fetchCoData() {
  try {
    const response = await fetch('@/api/owid-co2-data.json');
    if (!response.ok) throw new Error('Fetch data error');
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
}
