import { FaUserCog, FaUserTag } from 'react-icons/fa'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem
        icon={FaUserTag}
        label='Chef Requests'
        address='chef-requests'
      />
    </>
  )
}

export default AdminMenu
