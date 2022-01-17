import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import styles from './InputText.module.scss'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
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
        error,
        className, spanClassName, inputStyle,
        formName, placeholder, value,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === 'Enter'
        && onEnter()
    }

    const finalSpanClassName = `${styles.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${styles.errorInput} ${className}`
    const InputStyleClassName = inputStyle ? styles.inputStyle : ''

    return (
        <div className={styles.inputWrapper}>
            {error
                ? <label className={finalSpanClassName} htmlFor={type}>{error}</label>
                : <label className={styles.label} htmlFor={type}>{formName}</label>
            }
            <input
                id={type}
                type={type}
                value={value}
                onChange={onChangeCallback}
                placeholder={placeholder}
                onKeyPress={onKeyPressCallback}
                className={`${finalInputClassName} ${InputStyleClassName}`}
                {...restProps}
            />
        </div>
    )
}

