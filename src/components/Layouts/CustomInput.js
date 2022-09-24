import { Input } from '@nextui-org/react';
import { useState } from 'react';

export default function CustomInput({ setValue, value, placeholder, type }) {

    const [status, setStatus] = useState(value ? 'success' : 'default')
    const [valueTemp, setValueTemp] = useState(value || '')

    return (
        <Input
            clearable
            underlined
            labelPlaceholder={placeholder}
            value={value}
            type={type? type : 'text'}
            css={{ marginTop: '50px', width: '100%' }}
            onChange={event => {
                setValue(event.target.value)
                setValueTemp(event.target.value)
            }}
            status={status}
            onFocus={()=>setStatus('default')}
            onBlur={() => valueTemp.length > 0? setStatus('success') : setStatus('error')}
        />
    )
}