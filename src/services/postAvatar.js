import { endpoint } from "./endpoint"

export const postAvatar = async (data, userId, token) => {
    console.log(token)
    try{
      const response = await endpoint.put(`/uploads/users/${userId}`, {
        headers: {
          "X-Auth-Token": token,
          "content-type": "application/json"
        },
        body: {
          file: data
        }
      })
      console.log('Respuesta: ', response)
      // return response
    } catch (error) {
      console.log('error: ', error.response)
    }
}