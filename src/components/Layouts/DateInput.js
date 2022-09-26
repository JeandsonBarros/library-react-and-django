import { Input } from '@nextui-org/react';
import { useState } from 'react';

export default function DateInput({ setValue, value, label }) {

    const [status, setStatus] = useState(value ? 'success' : 'primary')
    const [valueTemp, setValueTemp] = useState(value || '')

    return (
            <Input
                label={label}
                value={value}
                type='date'
                width="186px"
                css={{ marginTop: '10px'}}
                onChange={event => {
                    setValue(event.target.value)
                    setValueTemp(event.target.value)
                }}
                status={status}
                onFocus={() => setStatus('default')}
                onBlur={() => valueTemp.length > 0 ? setStatus('success') : setStatus('error')}

            />   
    )
}