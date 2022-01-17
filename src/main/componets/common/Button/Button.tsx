import React, {ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent} from 'react'
import styles from './Button.module.scss'


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    btn?: boolean
    onClick?: () => void
    classBtn?: string
}

export const Button: React.FC<SuperButtonPropsType> = (
    {
        className, btn,
        color,
        onClick, classBtn,
        ...restProps
    }
) => {

    const onClickCallback = (e: MouseEvent<HTMLButtonElement>) => {
        onClick && onClick(e)
    }

    let btnClassName
    if (classBtn === 'btn') {
        btnClassName = styles.btn
    }
    if (classBtn === 'deleteBtn') {
        btnClassName = `${styles.btn} ${styles.deleteBtn}`
    }
    if (classBtn === 'updateBtn') {
        btnClassName = `${styles.btn} ${styles.updateBtn}`
    }
    if (classBtn === 'confirmBtn') {
        btnClassName = `${styles.btn} ${styles.confirmBtn}`
    }
    if (classBtn === 'cancelBtn') {
        btnClassName = `${styles.btn} ${styles.cancelBtn}`
    }
    if (classBtn === 'deleteBtn') {
        btnClassName = `${styles.btn} ${styles.deleteBtn}`
    }
    if (classBtn === 'bigDeleteBtn') {
        btnClassName = `${styles.btn} ${styles.bigDeleteBtn}`
    }
    if (classBtn === 'filteMyBtn') {
        btnClassName = `${styles.btn} ${styles.filteMyBtn}`
    }
    if (classBtn === 'filterAllBtn') {
        btnClassName = `${styles.btn} ${styles.filterAllBtn}`
    }
    if (classBtn === 'filterMyBtnActive') {
        btnClassName = `${styles.btn} ${styles.filterMyBtnActive}`
    }
    if (classBtn === 'filterAllBtnActive') {
        btnClassName = `${styles.btn} ${styles.filterAllBtnActive}`
    }

    return (
        <button
            onClick={onClickCallback}
            className={btnClassName}
            {...restProps}
        />
    )
}
