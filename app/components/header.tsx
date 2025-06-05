import type { FC } from 'react'
import React from 'react'
import {
  Bars3Icon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid'
import AppIcon from '@/app/components/base/app-icon'
export type IHeaderProps = {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
  remainingUsage?: number | null
}
const Header: FC<IHeaderProps> = ({
  title,
  isMobile,
  onShowSideBar,
  onCreateNewChat,
  remainingUsage,
}) => {
  return (
    <div className="shrink-0 flex items-center justify-between h-12 px-3 bg-gray-100">
      {isMobile
        ? (
          <div
            className='flex items-center justify-center h-8 w-8 cursor-pointer'
            onClick={() => onShowSideBar?.()}
          >
            <Bars3Icon className="h-4 w-4 text-gray-500" />
          </div>
        )
        : <div></div>}
      <div className='flex items-center space-x-2'>
        <AppIcon size="small" />
        <div className=" text-sm text-gray-800 font-bold">{title}</div>
      </div>
      <div className='flex items-center space-x-2'>
        {remainingUsage !== null && (
          <div className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded-full border border-blue-200">
            剩余: {remainingUsage} 次
          </div>
        )}
        {isMobile
          ? (
            <div className='flex items-center justify-center h-8 w-8 cursor-pointer'
              onClick={() => onCreateNewChat?.()}
            >
              <PencilSquareIcon className="h-4 w-4 text-gray-500" />
            </div>)
          : null}
      </div>
    </div>
  )
}

export default React.memo(Header)
