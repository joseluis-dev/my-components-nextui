import { useUserInfo, useUserLogout } from '#Hooks/User/useUser'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react'

export default function AvatarUser () {
  const { logoutTrigger } = useUserLogout()
  const { infoUsuario } = useUserInfo()

  const handleLogout = () => {
    logoutTrigger().then().catch(err => { console.log(err) })
  }

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
          }}
          className="transition-transform"
          name={infoUsuario?.InfoUsuario[0]?.CUEN_NOMB_USUARIO}
          description={infoUsuario?.InfoUsuario[0]?.CUEN_USUARIO}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">@tonyreichert</p>
        </DropdownItem>
        <DropdownItem key="settings">
          Ajustes de Usuario
        </DropdownItem>
        <DropdownItem key="Ayuda">
          Ayuda
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={handleLogout}>
          Salir
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
