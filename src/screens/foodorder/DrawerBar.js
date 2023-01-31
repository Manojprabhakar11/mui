import React from 'react'
import { Drawer } from '@material-ui/core'

export default function Drawer(props) {
    return (
       <Drawer>
           {props.children}
       </Drawer>
    )
}
