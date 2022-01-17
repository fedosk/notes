import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import styles from './InputText.module.scss'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    spanClassName?: string
    inputStyle?: boolean
    formName?: string
    placeholder?: string
    value: string
}

export const InputText: React.FC<SuperInputTextPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        className, spanClassName, inputStyle,
        formName, placeholder, value,

        ...restProps
    }
) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter
        && e.key === 'Enter'
        && onEnter()
    }

    return (
        <div className={styles.inputWrapper}>
            <input
                id={type}
                type={type}
                value={value}
                onChange={onChangeCallback}
                placeholder={placeholder}
                onKeyPress={onKeyPressCallback}
                className={styles.inputStyle}
                {...restProps}
            />
        </div>
    )
}

