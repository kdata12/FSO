import axios from "axios";
const baseurl = "/api/persons"

const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseurl, newObject)
    return request.then(response => response.data)
}

const deleteId = (id) => {
    const request = axios.delete(`${baseurl}/${id}`)
    return request.then(response => response.data)
}

const update = (newOjbect, currentPersonId) => {
    const request = axios.put(`${baseurl}/${currentPersonId}`, newOjbect)
    return request.then(reponse => reponse.data)
}

export default { getAll, create, deleteId, update }