export async function fetchHome(festival = "default") {
  const res = await fetch(`http://192.168.1.148:3000/api/home`)

  const json = await res.json()

  // console.log("RES ::: ", JSON.stringify(json.data, null, 2))

  return json.data // ✅ return ONLY sections
}
