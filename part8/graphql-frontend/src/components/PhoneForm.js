import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_NUMBER } from '../queries'

const PhoneForm = ({ setError }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [editNumber, result] = useMutation(EDIT_NUMBER)

    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
            setError('person not found')
        }
    }, [result.data])

    const submit = (event) => {
        event.preventDefault()

        editNumber({ variables: { name, phone } })
        setName('')
        setPhone('')
    }


    return (
        <div>
            <h2>Edit Phone number</h2>
            <form onSubmit={submit}>
                <div>
                    name <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    phone number <input
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                </div>
                <button type="submit">change phone number</button>
            </form>
        </div>
    )
}

export default PhoneForm