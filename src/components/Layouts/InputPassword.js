import { Input } from '@nextui-org/react';
import { useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

export default function InputPassword({ setValue, value, placeholder }) {

    const [status, setStatus] = useState(value ? 'success' : 'default')
    const [valueTemp, setValueTemp] = useState(value || '')

    return (
        <Input.Password
            underlined
            labelPlaceholder={placeholder}
            css={{ marginTop: '50px', width: '100%' }}
            visibleIcon={<BsFillEyeFill />}
            hiddenIcon={<BsFillEyeSlashFill />}
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