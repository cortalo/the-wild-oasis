import supabase from "./supabase";

export async function getAgenda() {
  const { data, error } = await supabase.from("agenda").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
