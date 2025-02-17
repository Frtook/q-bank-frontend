import React from 'react'
import Breadcrumb from './breadcrumb'
import LanguageSwitcher from './Navbar/LanguageSwitcher'
import ThemeSwitcher from './Navbar/ThemeSwitcher'

export default function Header({lang}: {lang: string}) {
  return (
    <div className='w-full px-6 py-4 bg-white dark:bg-[#2A2A3A] shadow-sm rounded-lg flex justify-between items-center'>
      <Breadcrumb lang={lang} />
      <div className='flex gap-4 items-center'>
      <LanguageSwitcher lang={lang} />
      <ThemeSwitcher  lang={lang} />
      </div>
    </div>
  )
}
