import type { FC } from 'react'
import classNames from 'classnames'
import style from './style.module.css'

export type AppIconProps = {
  size?: 'xs' | 'tiny' | 'small' | 'medium' | 'large'
  rounded?: boolean
  icon?: string
  background?: string
  className?: string
}

const AppIcon: FC<AppIconProps> = ({
  size = 'medium',
  rounded = false,
  background,
  className,
}) => {
  // 定义不同 size 对应的像素值
  const sizeMap = {
    xs: 16,
    tiny: 20,
    small: 28,
    medium: 40,
    large: 64,
  }
  const px = sizeMap[size] || 40
  return (
    <span
      className={classNames(
        style.appIcon,
        size !== 'medium' && style[size],
        rounded && style.rounded,
        className ?? '',
      )}
      style={{
        background,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: px,
        height: px,
        borderRadius: rounded ? '50%' : undefined,
        overflow: 'hidden',
      }}
    >
      <img src="/zju_logo.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </span>
  )
}

export default AppIcon
